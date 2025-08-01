const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.post('/', (req, res) => {
    const queries = 'insert into offers( Id,itemName,offer) values ?';
    const offers = [];
    const datas = req.body;
    console.log(datas);
    for(const item of datas){
      if (item.Id && item.itemName && item.offer){
      offers.push([item.Id,item.itemName,item.offer]);
    }
  }
    connection.query(queries,[offers],(err,results)=>{
      if(err){
        console.log(err);
      }
      console.log(results)
  
    })
    res.status(201).json({ message: 'Data inserted successfully' });
});

module.exports = router;