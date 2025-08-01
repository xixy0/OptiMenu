const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.get('/', async (req, res) => {
    try{
    //const date = new Date().toISOString().slice(0, 10);
     // query = ' SELECT itemName, price, SUM(quantity) AS totalQuantity,order_date from ordered GROUP BY itemName, price,order_date';
      query1 = 'select SUM(total_order_summary) as revenue ,count(distinct order_id) as total_orders from order_summary where WEEK(order_date) = WEEK(CURDATE()) AND YEAR(order_date) = YEAR(CURDATE())';
      query2 = 'select SUM(total_order_summary) as previous_revenue ,count(distinct order_id) as total_orders from order_summary where WEEK(order_date) = WEEK(CURDATE())-1 AND YEAR(order_date) = YEAR(CURDATE())';
      const [rows1] = await connection.query(query1)
      const [rows2] = await connection.query(query2)
      const perc = (rows1[0].revenue-rows2[0].previous_revenue)/rows1[0].revenue;
      const result = 
        {
            currentWeek:rows1[0].revenue,
            prevWeek:rows2[0].previous_revenue,
            totalOrders:rows1[0].total_orders,
            percentageChange:perc,
            currentAvgOrderValue:rows1[0].revenue/rows1[0].total_orders,
        }
      


      console.log("Data fetched : ", result);
      res.status(200).json(result);
    }
    catch(error){
        console.error(error);
        res.status(500).send('Error in processing...');
    }
    })

    module.exports = router;