const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.get('/',async (req,res)=>{
    try{
        console.log("conversion")
    const query = `SELECT COUNT(CASE WHEN status = 'paid' THEN 1 END) / COUNT(*) AS paid_ratio FROM active_order;`;
    const [rows,fields] = await connection.query(query);
    console.log(rows);
    res.status(200).json(rows);
    }
    catch(error){
        console.log(error);
        res.status(500).send("itsss erorrrry bruhhh");
    }
})
module.exports = router; 