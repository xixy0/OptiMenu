const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.get('/', async (req,res)=>{
 // const options = { timeZone: 'Asia/Kolkata' };
  //const date = new Date().toLocaleString('en-US', options).slice(0, 10);
    const query = 'select itemName as name, (sum(price)/count(price))*sum(quantity) as totalRevenue , sum(quantity) as quantitySold from ordered  where YEAR(order_date) = YEAR(NOW()) and WEEK(order_date) = WEEK(NOW()) group by itemName order by totalRevenue desc limit 1'
    const [rows] = await connection.query(query);
    console.log(rows)
    res.status(200).json(rows);
  })

module.exports = router;