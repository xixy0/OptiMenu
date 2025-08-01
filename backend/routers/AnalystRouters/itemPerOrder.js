const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.get('/',async (req,res)=>{
    try{
        console.log("iems per order")
    const query = 'select count(itemname)/count(distinct order_id) as value from orders ;'
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