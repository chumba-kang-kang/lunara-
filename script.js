// ==========================
// SIGN UP FUNCTION
// ==========================
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    localStorage.setItem("lunaraUser", JSON.stringify({ name, email, password }));
    alert("Account created successfully! You can now log in.");
    window.location.href = "login.html";
  });
}

// ==========================
// LOGIN FUNCTION
// ==========================
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const storedUser = JSON.parse(localStorage.getItem("lunaraUser"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      alert("Welcome back, " + storedUser.name + "!");
      window.location.href = "index.html";
    } else {
      alert("Invalid email or password.");
    }
  });
}

// ==========================
// PAGE ACCESS CONTROL
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("lunaraUser"));
  const mainContent = document.getElementById("mainContent");
  const userName = document.getElementById("userName");

  if (mainContent) {
    if (!user) {
      window.location.href = "login.html";
    } else {
      mainContent.style.display = "block";
      userName.textContent = user.name;
    }
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("lunaraUser");
      window.location.href = "login.html";
    });
  }
});

// ==========================
// LUNARA CALENDAR VIEW
// ==========================
const calendarGrid = document.getElementById("calendarGrid");
const monthYear = document.getElementById("monthYear");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

let date = new Date();

if (calendarGrid && monthYear) {
  renderCalendar();

  prevMonthBtn.addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
  });

  nextMonthBtn.addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
  });
}

function renderCalendar() {
  calendarGrid.innerHTML = "";

  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const today = new Date();

  monthYear.textContent = date.toLocaleString("default", { month: "long", year: "numeric" });

  // Sample data for now
  const periodStart = 10;
  const fertileStart = 15;
  const fertileEnd = 20;

  for (let i = 0; i < firstDay.getDay(); i++) {
    const emptyCell = document.createElement("div");
    calendarGrid.appendChild(emptyCell);
  }

  for (let day = 1; day <= lastDay.getDate(); day++) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = day;
    dayDiv.classList.add("day");

    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayDiv.classList.add("today");
    }

    if (day >= periodStart && day < periodStart + 5) {
      dayDiv.classList.add("period-day");
    } else if (day >= fertileStart && day <= fertileEnd) {
      dayDiv.classList.add("fertile-day");
    } else {
      dayDiv.classList.add("safe-day");
    }

    calendarGrid.appendChild(dayDiv);
  }
}
