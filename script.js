let users = [];

// Show the login form
function showLoginForm() {
    document.getElementById('create-account-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

// Show the create account form
function showCreateAccountForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('create-account-form').style.display = 'block';
}

// Create a new account
function createAccount() {
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    const role = document.getElementById('new-role').value;

    if (username && password && role) {
        if (users.some(user => user.username === username)) {
            alert('Username already exists. Please choose a different username.');
        } else {
            users.push({ username, password, role });
            alert('Account created successfully!');
            showLoginForm();
        }
    } else {
        alert('Please fill in all fields.');
    }
}

// Login the user
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        document.getElementById('login-form').style.display = 'none';
        if (user.role === 'shopper') {
            document.getElementById('shopper-interface').style.display = 'block';
        } else if (user.role === 'shop_owner') {
            document.getElementById('shop_owner-interface').style.display = 'block';
        }
    } else {
        alert('Invalid username or password.');
    }
}

// Event listeners for buttons and links
document.getElementById('create-account-btn').addEventListener('click', createAccount);
document.getElementById('login-btn').addEventListener('click', login);
document.getElementById('show-login').addEventListener('click', showLoginForm);
document.getElementById('show-create-account').addEventListener('click', showCreateAccountForm);
