const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.get('/', async (req, res) => {
    try{
        console.log("weeklyStats")
    const date = new Date().toISOString().slice(0, 10);
     // query = ' SELECT itemName, price, SUM(quantity) AS totalQuantity,order_date from ordered GROUP BY itemName, price,order_date';
     query = `select DAYNAME(order_date) AS day,SUM(price) AS total_price from orders where week(order_date) = week(curdate())-1 GROUP BY order_date ORDER BY order_date limit 7`
      const [rows, fields] = await connection.query(query,[date])
      console.log("Data fetched : ", rows);
      res.status(200).json(rows);
    }
    catch(error){
        console.error(error);
        res.status(500).send('Error in processing...');
    }
    })

    module.exports = router;