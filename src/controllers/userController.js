const bcrypt = require('bcryptjs');
const db = require('../../server/db');

const registerUser = (req, res) => {
    const { username, email, password } = req.body;

    const checkEmailQuery = `SELECT * FROM users WHERE email = ?`;
    db.get(checkEmailQuery, [email], (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (row) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const insertQuery = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
        db.run(insertQuery, [username, email, hashedPassword], function (err) {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            res.status(201).json({ id: this.lastID, username, email });
        });
    });
};

const getUsers = (req, res) => {
    const query = `SELECT id, username, email FROM users`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        res.json(rows);
    });
};

module.exports = { registerUser, getUsers };
