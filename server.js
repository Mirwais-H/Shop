const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const usersFilePath = './users.json';

app.post('/api/create-account', (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
        return res.status(400).json({ message: 'Please fill in all fields.' });
    }

    fs.readFile(usersFilePath, (err, data) => {
        if (err) throw err;
        let users = JSON.parse(data);
        if (users.some(user => user.username === username)) {
            return res.status(400).json({ message: 'Username already exists.' });
        }

        users.push({ username, password, role });
        fs.writeFile(usersFilePath, JSON.stringify(users), (err) => {
            if (err) throw err;
            res.json({ message: 'Account created successfully!' });
        });
    });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Please fill in all fields.' });
    }

    fs.readFile(usersFilePath, (err, data) => {
        if (err) throw err;
        const users = JSON.parse(data);
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            res.json({ message: 'Login successful!', role: user.role });
        } else {
            res.status(400).json({ message: 'Invalid username or password.' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
