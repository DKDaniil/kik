const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;
    
    db.run(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, password],
        function (err) {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Ошибка регистрации' });
            }
            console.log(`User added with ID: ${this.lastID}`);
            res.status(201).json({ message: 'User registered successfully' });
        }
    );
});
