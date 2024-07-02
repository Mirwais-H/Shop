const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();
const port = 3000;

// Middleware for parsing JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Simulated in-memory storage (replace with database in real application)
let users = [];
let items = []; // Simulated storage for items

// Register a new user
app.post('/api/register', (req, res) => {
    const userData = req.body;

    // Simulated validation (replace with actual validation logic)
    if (!userData || !userData.username || !userData.password) {
        return res.status(400).json({ error: 'Invalid data' });
    }

    // Simulated check if username already exists (replace with database check)
    const existingUser = users.find(user => user.username === userData.username);
    if (existingUser) {
        return res.status(409).json({ error: 'Username already exists' });
    }

    // Simulated save user data (push to array in this example)
    users.push(userData);
    console.log('User registered:', userData);
    res.status(201).json({ message: 'User registered successfully' });
});

// Authenticate user login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Simulated find user by username and password (replace with database check)
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    console.log('User authenticated:', user);
    res.status(200).json({ message: 'User authenticated successfully', user });
});

// Add an item to the shop
app.post('/api/add-item', (req, res) => {
    const itemData = req.body;

    // Simulated validation (replace with actual validation logic)
    if (!itemData || !itemData.name || !itemData.description || !itemData.price || !itemData.deliveryMethod) {
        return res.status(400).json({ error: 'Incomplete item data' });
    }

    // Handle pickup address if delivery method is Pickup or Both
    if (itemData.deliveryMethod === 'Pickup' || itemData.deliveryMethod === 'Both') {
        if (!itemData.pickupAddress) {
            return res.status(400).json({ error: 'Pickup address is required for Pickup or Both delivery methods' });
        }
    }

    // Handle media files if provided
    if (req.files && req.files.media) {
        const mediaFiles = Array.isArray(req.files.media) ? req.files.media : [req.files.media];
        itemData.media = mediaFiles.map(file => ({
            name: file.name,
            data: file.data.toString('base64'),
            mimetype: file.mimetype
        }));
    }

    // Simulated save item data (push to array in this example)
    items.push(itemData);
    console.log('Item added:', itemData);
    res.status(201).json({ message: 'Item added successfully' });
});

// Handle 404 - Keep this as the last middleware
app.use((req, res, next) => {
    res.status(404).send("Sorry, can't find that!");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
