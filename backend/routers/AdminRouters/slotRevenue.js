const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.get('/',async (req,res)=>{
    try{
        console.log("slot revenue")
    const currentDate = new Date();
   // const options = { timeZone: 'Asia/Kolkata' };
    const date = currentDate.toISOString().slice(0, 10);
    const query = 'select Sum(price) as revenue, left(order_time,2) as slot from active_order where order_date = ? group by slot order by slot';
    const [rows,fields] = await connection.query(query,[date]);
    console.log(rows);
    res.status(200).json(rows);
    }
    catch(error){
        console.log(error);
        res.status(500).send("itsss erorrrry bruhhh");
    }
})
module.exports = router; 