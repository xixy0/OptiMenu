const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.get('/', async (req,res)=>{
  const options = { timeZone: 'Asia/Kolkata' };
  const date = new Date().toLocaleString('en-US', options).slice(0, 10);
    const query = 'select itemName , sum(price) as max_sold_price from ordered where order_date = ? group by itemName order by max_sold_price desc limit 1'
    const [rows,fields1] = await connection.query(query,[date]);
    console.log(rows)
    res.status(200).json(rows);
  })

module.exports = router;