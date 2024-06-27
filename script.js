document.getElementById('create-account-btn').addEventListener('click', createAccount);
document.getElementById('login-btn').addEventListener('click', login);
document.getElementById('show-login').addEventListener('click', showLoginForm);
document.getElementById('show-create-account').addEventListener('click', showCreateAccountForm);

function showLoginForm() {
    document.getElementById('create-account-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

function showCreateAccountForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('create-account-form').style.display = 'block';
}

async function createAccount() {
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    const role = document.getElementById('new-role').value;

    const response = await fetch('/api/create-account', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
    });

    const data = await response.json();
    alert(data.message);
    if (response.ok) {
        showLoginForm();
    }
}

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    alert(data.message);
    if (response.ok) {
        document.getElementById('login-form').style.display = 'none';
        if (data.role === 'shopper') {
            document.getElementById('shopper-interface').style.display = 'block';
        } else if (data.role === 'shop_owner') {
            document.getElementById('shop_owner-interface').style.display = 'block';
        }
    }
}
