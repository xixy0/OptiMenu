const express = require('express');
const router = express.Router();
const connection = require('../../db');
const bcrypt = require('bcrypt');

router.post('/',async (req,res)=>{
    try{
        const { fullName, email, password, organization, phone } = req.body;
    const query = 'insert into admin(name,email,organization,phone_no,password) values(?,?,?,?,?)';
    //const {username , password, role} = req.body;
    console.log(fullName);
    const hashedPassword = await bcrypt.hash(password, 10);
    const formattedSql = connection.format(query, [fullName,email,organization,phone,password]);
    await connection.query(formattedSql);
    //await connection.query(query,[username,password,username,role])
    res.status(201).json({ message: 'User created successfully.', user: {fullName } });
    }
    catch(error){
        console.error(error);
        res.status(500).send('Error creating user.');
    }

})

module.exports = router;