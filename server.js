const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Simulated in-memory storage (replace with database in real application)
let users = [];

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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
