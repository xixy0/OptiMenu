const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.get('/', async (req,res)=>{
    const currentDate = new Date();
    const date = currentDate.toISOString().slice(0, 10);
    var date2 = date;
    var currentHour = currentDate.getHours();
    if(currentHour===0){
      currentHour=24;
      previousHour = 23;
      date2=parseInt(date2)-1;
  
    }
    else { previousHour = currentHour-1;}
    console.log(currentHour);
    console.log(previousHour);
    console.log(date2);
    console.log(date);
    query = 'select SUM(price) as total_price from ordered where left(order_time,2)=? and order_date = ?'
    const [rows1,fields1] = await connection.query(query,[currentHour,date]);
    const [rows2,fields2] = await connection.query(query,[previousHour,date2]);
    console.log(rows1);
    console.log(rows2);
    const result = parseInt(rows1[0].total_price)- parseInt(rows2[0].total_price);
    res.status(200).json(result);
  });

  module.exports = router;