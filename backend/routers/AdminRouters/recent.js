const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.get('/', async (req,res)=>{
    try{
    query = 'select * from active_order order by order_id DESC LIMIT 5'
    const [rows,fields] = await connection.query(query);
    res.status(200).json(rows);
    }
    catch(error){
        console.error(error);
        res.status(500).send('Error in processing...');
    }
  })

  module.exports = router;