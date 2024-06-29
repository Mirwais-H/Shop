document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login');
    const registerForm = document.getElementById('register');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    const accountTypeSelect = document.getElementById('account-type');
    const shopOwnerPasswordField = document.querySelector('.shop-owner-password');

    // Show login form initially
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';

    // Switch to registration form
    showRegisterLink.addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('register-form').style.display = 'block';
    });

    // Switch to login form
    showLoginLink.addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('register-form').style.display = 'none';
    });

    // Handle account type selection
    accountTypeSelect.addEventListener('change', function () {
        const selectedOption = accountTypeSelect.value;
        if (selectedOption === 'shop-owner') {
            shopOwnerPasswordField.style.display = 'block';
        } else {
            shopOwnerPasswordField.style.display = 'none';
        }
    });

    // Registration form submission
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const accountType = accountTypeSelect.value;
        const shopOwnerPassword = document.getElementById('shop-owner-password').value;

        // Check if passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Simulate account creation based on account type
        if (accountType === 'buyer') {
            alert('Buyer account created successfully');
            // Redirect to login form after account creation
            document.getElementById('login-form').style.display = 'block';
            document.getElementById('register-form').style.display = 'none';
        } else if (accountType === 'shop-owner' && shopOwnerPassword === '2007') {
            alert('Shop owner account created successfully');
            // Redirect to login form after account creation
            document.getElementById('login-form').style.display = 'block';
            document.getElementById('register-form').style.display = 'none';
        } else {
            alert('Invalid shop owner password');
            return;
        }
    });

    // Login form submission
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username-login').value;
        const password = document.getElementById('password-login').value;

        // Dummy check for login (replace with actual authentication logic)
        // For demonstration, assume login is always successful and account type is stored in local storage
        alert('Logged in successfully');
        const accountType = localStorage.getItem('accountType');
        if (accountType === 'buyer') {
            window.location.href = 'home_buyer.html'; // Redirect to buyer's home page
        } else if (accountType === 'shop-owner') {
            window.location.href = 'home_shop_owner.html'; // Redirect to shop owner's home page
        }
    });
});
