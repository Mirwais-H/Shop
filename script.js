// Show register form
function showRegister() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('register-form').style.display = 'block';
}

// Show login form
function showLogin() {
  document.getElementById('register-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
}

// Toggle pin code input visibility
function togglePinCode() {
  const role = document.getElementById('register-role').value;
  const pinInput = document.getElementById('register-pin');
  if (role === 'shopOwner') {
      pinInput.style.display = 'block';
  } else {
      pinInput.style.display = 'none';
  }
}

// Register a new user
function register() {
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;
  const role = document.getElementById('register-role').value;
  const pin = document.getElementById('register-pin').value;

  if (username && password) {
      if (role === 'shopOwner' && pin !== '2007') {
          alert('Invalid pin code for shop owner account.');
          return;
      }

      const user = { password, role };
      localStorage.setItem(username, JSON.stringify(user));
      alert('Account created successfully!');
      showLogin();
  } else {
      alert('Please fill out all fields.');
  }
}

// Login a user
function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  const storedUser = JSON.parse(localStorage.getItem(username));

  if (storedUser && storedUser.password === password) {
      alert('Login successful!');
      document.getElementById('auth-container').style.display = 'none';
      document.getElementById('shop-container').style.display = 'block';
      document.getElementById('user-role-message').innerText = `You are logged in as a ${storedUser.role}.`;

      if (storedUser.role === 'shopOwner') {
          document.getElementById('shop-owner-section').style.display = 'block';
          document.getElementById('buyer-section').style.display = 'none';
      } else {
          document.getElementById('shop-owner-section').style.display = 'none';
          document.getElementById('buyer-section').style.display = 'block';
          displayItems();
          displayCart();
      }
  } else {
      alert('Invalid username or password.');
  }
}

// Logout the user
function logout() {
  document.getElementById('shop-container').style.display = 'none';
  document.getElementById('auth-container').style.display = 'block';
}

// Add item
function addItem() {
  const itemName = document.getElementById('item-name').value;
  const itemDescription = document.getElementById('item-description').value;
  const itemMedia = document.getElementById('item-media').files[0];
  const itemPrice = document.getElementById('item-price').value;
  const itemDelivery = document.getElementById('item-delivery').value;

  if (itemName && itemDescription && itemMedia && itemPrice && itemDelivery) {
      const reader = new FileReader();
      reader.onload = function(e) {
          const item = {
              name: itemName,
              description: itemDescription,
              media: e.target.result,
              price: itemPrice,
              delivery: itemDelivery
          };
          const items = JSON.parse(localStorage.getItem('items')) || [];
          items.push(item);
          localStorage.setItem('items', JSON.stringify(items));
          alert('Item added successfully!');
          document.getElementById('item-name').value = '';
          document.getElementById('item-description').value = '';
          document.getElementById('item-media').value = '';
          document.getElementById('item-price').value = '';
          document.getElementById('item-delivery').value = 'pick-up';
          displayItems();
      };
      reader.readAsDataURL(itemMedia);
  } else {
      alert('Please fill out all fields.');
  }
}

// Display items
function displayItems() {
  const items = JSON.parse(localStorage.getItem('items')) || [];
  const itemsList = document.getElementById('items-list');
  itemsList.innerHTML = '';

  items.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'item';
      itemElement.innerHTML = `
          <h4>${item.name}</h4>
          <p>${item.description}</p>
          <img src="${item.media}" alt="${item.name}" style="max-width: 100%;">
          <p>Price: $${item.price}</p>
          <p>Delivery: ${item.delivery}</p>
          <button onclick="addToCart('${item.name}')">Add to Cart</button>
      `;
      itemsList.appendChild(itemElement);
  });
}

// Search items
function searchItems() {
  const query = document.getElementById('search-bar').value.toLowerCase();
  const items = JSON.parse(localStorage.getItem('items')) || [];
  const itemsList = document.getElementById('items-list');
  itemsList.innerHTML = '';

  items.filter(item => item.name.toLowerCase().includes(query)).forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'item';
      itemElement.innerHTML = `
          <h4>${item.name}</h4>
          <p>${item.description}</p>
          <img src="${item.media}" alt="${item.name}" style="max-width: 100%;">
          <p>Price: $${item.price}</p>
          <p>Delivery: ${item.delivery}</p>
          <button onclick="addToCart('${item.name}')">Add to Cart</button>
      `;
      itemsList.appendChild(itemElement);
  });
}

// Add item to cart
function addToCart(itemName) {
  const items = JSON.parse(localStorage.getItem('items')) || [];
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const item = items.find(i => i.name === itemName);
  if (item) {
      cart.push(item);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${itemName} added to cart!`);
      displayCart();
  } else {
      alert('Item not found.');
  }
}

// Display cart items
function displayCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartList = document.getElementById('cart-list');
  cartList.innerHTML = '';

  cart.forEach((item, index) => {
      const cartItemElement = document.createElement('div');
      cartItemElement.className = 'cart-item';
      cartItemElement.innerHTML = `
          <h4>${item.name}</h4>
          <p>${item.description}</p>
          <img src="${item.media}" alt="${item.name}" style="max-width: 100%;">
          <p>Price: $${item.price}</p>
          <p>Delivery: ${item.delivery}</p>
          <button onclick="removeFromCart(${index})">Remove</button>
      `;
      cartList.appendChild(cartItemElement);
  });
}

// Remove item from cart
function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

// Checkout
function checkout() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
  }

  let total = 0;
  cart.forEach(item => {
      total += parseFloat(item.price);
  });

  alert(`Your total is $${total}. Thank you for your purchase!`);
  localStorage.removeItem('cart');
  displayCart();
}
