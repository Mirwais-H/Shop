document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('register');
    const loginForm = document.getElementById('login');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    const accountTypeSelect = document.getElementById('account-type');
    const shopOwnerPasswordField = document.querySelector('.shop-owner-password');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    const usernameError = document.getElementById('username-error');

    // Show login form initially
    if (document.getElementById('login-form')) {
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('register-form').style.display = 'none';
    }

    // Switch to registration form
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('register-form').style.display = 'block';
        });
    }

    // Switch to login form
    if (showLoginLink) {
        showLoginLink.addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById('login-form').style.display = 'block';
            document.getElementById('register-form').style.display = 'none';
        });
    }

    // Handle account type selection
    if (accountTypeSelect) {
        accountTypeSelect.addEventListener('change', function () {
            const selectedOption = accountTypeSelect.value;
            if (selectedOption === 'shop-owner') {
                shopOwnerPasswordField.style.display = 'block';
            } else {
                shopOwnerPasswordField.style.display = 'none';
            }
        });
    }

    // Registration form submission
    if (registerForm) {
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

            // Validate form data
            let valid = true;

            // Check if passwords match
            if (password !== confirmPassword) {
                valid = false;
                if (confirmPasswordError) {
                    confirmPasswordError.textContent = 'Passwords do not match';
                }
            } else {
                if (confirmPasswordError) {
                    confirmPasswordError.textContent = '';
                }
            }

            // Simulated username check (replace with actual check)
            if (username === 'takenUsername') {
                valid = false;
                if (usernameError) {
                    usernameError.textContent = 'Username is already taken';
                }
            } else {
                if (usernameError) {
                    usernameError.textContent = '';
                }
            }

            if (!valid) {
                return;
            }

            // Prepare data to send to backend
            const userData = {
                name: name,
                lastName: lastName,
                email: email,
                username: username,
                password: password,
                accountType: accountType,
                shopOwnerPassword: shopOwnerPassword
            };

            // AJAX call to save user data
            fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    // Redirect to appropriate page based on account type
                    if (accountType === 'buyer') {
                        window.location.href = 'buyer-home.html';
                    } else {
                        window.location.href = 'shop-owner-home.html';
                    }
                }
            })
            .catch(error => {
                console.error('Error registering user:', error);
                alert('Error registering user. Please try again later.');
            });
        });
    }

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.getElementById('username-login').value;
            const password = document.getElementById('password-login').value;

            // AJAX call to authenticate user
            fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, password: password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    // Redirect to appropriate page based on account type
                    const accountType = data.user.accountType;
                    if (accountType === 'buyer') {
                        window.location.href = 'buyer-home.html';
                    } else {
                        window.location.href = 'shop-owner-home.html';
                    }
                }
            })
            .catch(error => {
                console.error('Error authenticating user:', error);
                alert('Invalid username or password. Please try again.');
            });
        });
    }

    // Handle logout button click
    const logoutButtons = document.querySelectorAll("#logout");

    logoutButtons.forEach(button => {
        button.addEventListener("click", function() {
            // Simulate logging out by redirecting to the login page or clear session storage
            // You can replace this with actual logout logic if needed
            window.location.href = "index.html";
        });
    });

    // Shop Owner Dashboard Add Item Form
    const dashboardLink = document.querySelector('nav a[href="#dashboard"]');
    const dashboardSection = document.getElementById('dashboard');
    const addItemForm = document.getElementById('add-item-form');
    const deliveryMethodSelect = document.getElementById('delivery-method');
    const pickupAddressContainer = document.getElementById('pickup-address-container');

    // Event listener for clicking the dashboard link
    if (dashboardLink) {
        dashboardLink.addEventListener('click', function (e) {
            e.preventDefault();
            showDashboard();
        });
    }

    // Function to show the dashboard section
    function showDashboard() {
        // Hide all other sections if needed
        // Example: hideSectionsExcept('dashboard');
        
        // Show the dashboard section
        dashboardSection.style.display = 'block';
    }

    // Event listener for delivery method select
    if (deliveryMethodSelect) {
        deliveryMethodSelect.addEventListener('change', function () {
            if (deliveryMethodSelect.value === 'pickup' || deliveryMethodSelect.value === 'both') {
                pickupAddressContainer.style.display = 'block';
            } else {
                pickupAddressContainer.style.display = 'none';
            }
        });
    }

    // Event listener for adding item form submission
    if (addItemForm) {
        addItemForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(addItemForm);
            const itemData = {};
            formData.forEach((value, key) => {
                itemData[key] = value;
            });

            fetch('http://localhost:3000/api/add-item', {
                method: 'POST',
                body: JSON.stringify(itemData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    alert('Item added successfully!');
                    addItemForm.reset();
                }
            })
            .catch(error => {
                console.error('Error adding item:', error);
                alert('Failed to add item. Please try again later.');
            });
        });
    }
});
