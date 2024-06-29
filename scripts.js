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
        const lastName = document.getElementById('last-name').value;
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

        // Prepare data to send to backend (simulated for demonstration)
        const userData = {
            name: name,
            lastName: lastName,
            email: email,
            username: username,
            password: password,
            accountType: accountType,
            shopOwnerPassword: shopOwnerPassword
        };

        // Simulated backend call to save user data (replace with actual AJAX call to backend)
        saveUserData(userData);
    });

    // Login form submission
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username-login').value;
        const password = document.getElementById('password-login').value;

        // Simulated backend call to authenticate user (replace with actual AJAX call to backend)
        authenticateUser(username, password);
    });

    // Simulated function to save user data to backend (replace with actual AJAX call)
    function saveUserData(userData) {
        console.log('Simulated backend call to save user data:', userData);
        // In a real scenario, make an AJAX POST request to your backend to save `userData`
        // Example:
        // fetch('/api/register', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(userData)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('User registered successfully:', data);
        //     // Optionally redirect to another page after successful registration
        // })
        // .catch(error => {
        //     console.error('Error registering user:', error);
        //     alert('Error registering user. Please try again later.');
        // });
    }

    // Simulated function to authenticate user (replace with actual AJAX call)
    function authenticateUser(username, password) {
        console.log('Simulated backend call to authenticate user:', username, password);
        // In a real scenario, make an AJAX POST request to your backend to authenticate user
        // Example:
        // fetch('/api/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ username: username, password: password })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('User authenticated successfully:', data);
        //     // Optionally redirect to another page after successful login
        // })
        // .catch(error => {
        //     console.error('Error authenticating user:', error);
        //     alert('Invalid username or password. Please try again.');
        // });
    }
});
