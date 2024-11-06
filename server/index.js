const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const db = new sqlite3.Database('./database.sqlite');

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/routes/api', (req, res) => {
    db.all('SELECT id, username, email FROM users', [], (err, rows) => {
        if (err) {
            res.status(500).json({ message: 'Database error' });
            return;
        }
        res.json(rows);
    });
});

app.post('/api/register', async (req, res) => {
    console.log('Received registration request:', req.body);
    try {
        const { username, email, password } = req.body;
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error during registration' });
    }
});



