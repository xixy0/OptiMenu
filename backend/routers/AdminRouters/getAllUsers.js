const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.get('/', async (req, res) => {
    try{
     // query = ' SELECT itemName, price, SUM(quantity) AS totalQuantity,order_date from ordered GROUP BY itemName, price,order_date';
     query = 'select distinct username,role ,id from users order by id desc limit 6'
      const [rows, fields] = await connection.query(query)
      console.log("Data fetched : ", rows);
      res.status(200).json(rows);
    }
    catch(error){
        console.error(error);
        res.status(500).send('Error in processing...');
    }
    })

    module.exports = router;