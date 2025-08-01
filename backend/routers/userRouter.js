const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const connection = require('../db.js');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
app.use(cors());

// Define user routes
router.post('/', async (req, res) => {
    try{
        const { username, password } = req.body;
        //const [rows, fields] = await connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
        const sql = 'SELECT * FROM users WHERE username = ?';
        const formattedSql = connection.format(sql, [username]);
        const [rows, fields] = await connection.query(formattedSql);
        console.log(username);
        if (rows.length === 0) {
            return res.status(401).send('Invalid username or password.');
        }
            const hashedPassword = rows[0].password;
            const passwordMatch = await bcrypt.compare(password, hashedPassword);
            if (!passwordMatch) {
                return res.status(401).send('Invalid username or password.');
            }
            console.log("recieved");
            //res.send("recieved");
           // res.redirect('localhost:3000/intro');
            const token = jwt.sign({ username: username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ success: true,token: token});
            console.log(token);
        } 
       catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Internal Server Error');
      }
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Error logging out');
        }
        res.redirect('/login');
    });
});

// Export the router
module.exports = router;