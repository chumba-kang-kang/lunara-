function signup() {
    let username = document.getElementById('username').value.trim();
    let password = document.getElementById('password').value.trim();

    if (!username || !password) {
        alert('Please fill in all fields');
        return;
    }

    if (localStorage.getItem('user_' + username)) {
        alert('Username already exists');
        return;
    }

    const userData = { password: password, cycleInfo: null };
    localStorage.setItem('user_' + username, JSON.stringify(userData));
    alert('Signup successful!');
    window.location.href = 'login.html';
}

function login() {
    let username = document.getElementById('username').value.trim();
    let password = document.getElementById('password').value.trim();

    const storedData = JSON.parse(localStorage.getItem('user_' + username));
    if (storedData && storedData.password === password) {
        localStorage.setItem('loggedInUser', username);
        alert('Login successful!');
        window.location.href = 'index.html';
    } else {
        alert('Invalid credentials!');
    }
}

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
}

// Redirect to login if not logged in
if (!localStorage.getItem('loggedInUser') && window.location.pathname.includes('index.html')) {
    window.location.href = 'login.html';
}
