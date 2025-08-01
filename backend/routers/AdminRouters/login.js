const express = require('express');
const router = express.Router();
const connection = require('../../db');
//const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');


router.post('/',async (req,res)=>{
    try{
        const {email, password} = req.body;
        const sql = 'SELECT * FROM admin WHERE email = ?';
        const formattedSql = connection.format(sql, [email]);
        const [rows, fields] = await connection.query(formattedSql);
       // console.log(username);
        if (rows.length === 0) {
            return res.status(401).send('Invalid username or password.');
        }
           // const hashedPassword = rows[0].password;
           // const passwordMatch = await bcrypt.compare(password, hashedPassword);
            if(rows[0].password!=password){
            // if (!passwordMatch) {
                return res.status(401).send('Invalid username or password.');
            }
        console.log("recieved");
            //res.send("recieved");
           // res.redirect('localhost:3000/intro');
           // const token = jwt.sign({ username: rows[0].fullName }, process.env.JWT_SECRET, { expiresIn: '1h' });
            //res.status(200).json({ success: true,token: token});
            res.status(200).json({ username :rows[0].name ,success: true});
           // console.log(token);
        }
        catch(error){
            console.error(error);
            res.status(500).send('Error creating user.');
        }

})

module.exports = router;