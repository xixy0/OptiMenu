const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.get('/', async (req, res) => {
    try{
    const date = new Date().toISOString().slice(0, 10);
     // query = ' SELECT itemName, price, SUM(quantity) AS totalQuantity,order_date from ordered GROUP BY itemName, price,order_date';
      query = 'select SUM(total_order_summary) as revenue from order_summary where MONTH(order_date) = MONTH(CURDATE()) AND YEAR(order_date) = YEAR(CURDATE())';
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