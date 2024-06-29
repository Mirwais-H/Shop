document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    const accountTypeSelect = document.getElementById('account-type');
    const shopOwnerPasswordField = document.querySelector('.shop-owner-password');

    // Show login form initially
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';

    // Switch to registration form
    showRegisterLink.addEventListener('click', function (e) {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });

    // Switch to login form
    showLoginLink.addEventListener('click', function (e) {
        e.preventDefault();
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
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
        const name = registerForm.querySelector('#name').value;
        const email = registerForm.querySelector('#email').value;
        const username = registerForm.querySelector('#username').value;
        const password = registerForm.querySelector('#reg-password').value;
        const confirmPassword = registerForm.querySelector('#confirm-password').value;
        const accountType = registerForm.querySelector('#account-type').value;
        const shopOwnerPassword = registerForm.querySelector('#shop-owner-password').value;

        // Check if passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Simulate account creation based on account type
        if (accountType === 'buyer') {
            alert('Buyer account created successfully');
            localStorage.setItem('accountType', 'buyer'); // Store account type in local storage
        } else if (accountType === 'shop-owner' && shopOwnerPassword === '2007') {
            alert('Shop owner account created successfully');
            localStorage.setItem('accountType', 'shop-owner'); // Store account type in local storage
        } else {
            alert('Invalid shop owner password');
            return;
        }

        // Redirect to login form after account creation
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    });

    // Login form submission
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = loginForm.querySelector('#username-login').value;
        const password = loginForm.querySelector('#password-login').value;

        // Log to console for debugging
        console.log('Attempting login with username:', username, 'and password:', password);

        // Dummy check for login (replace with actual authentication logic)
        // Simulate successful login (replace with actual logic)
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
