const express = require('express');
const router = express.Router();
const connection = require('../../db');


router.get('/today',async (req,res)=>{
    try{
        console.log("category performance")
    const query = 'select category as name,sum(quantity) as value from orders,menu where orders.order_date = curdate() and orders.itemname = menu.name group by category;';
    const [rows,fields] = await connection.query(query);
    console.log(rows);
    res.status(200).json(rows);
    }
    catch(error){
        console.log(error);
        res.status(500).send("itsss erorrrry bruhhh");
    }
})

router.get('/week',async (req,res)=>{
    try{
        console.log("category performance")
    const query = 'select category as name,sum(quantity) as value from orders,menu where week(orders.order_date) = WEEK(CURDATE()) and orders.itemname = menu.name group by category;';
    const [rows,fields] = await connection.query(query);
    console.log(rows);
    res.status(200).json(rows);
    }
    catch(error){
        console.log(error);
        res.status(500).send("itsss erorrrry bruhhh");
    }
})

router.get('/month',async (req,res)=>{
    try{
        console.log("category performance")
    const query = 'select category as name,sum(quantity) as value from orders,menu where month(orders.order_date) = month(CURDATE()) and orders.itemname = menu.name group by category;';
    const [rows,fields] = await connection.query(query);
    console.log(rows);
    res.status(200).json(rows);
    }
    catch(error){
        console.log(error);
        res.status(500).send("itsss erorrrry bruhhh");
    }
})

router.get('/year',async (req,res)=>{
    try{
        console.log("category performance")
    const query = 'select category as name,sum(quantity) as value from orders,menu where year(orders.order_date) = year(CURDATE()) and orders.itemname = menu.name group by category;';
    const [rows,fields] = await connection.query(query);
    console.log(rows);
    res.status(200).json(rows);
    }
    catch(error){
        console.log(error);
        res.status(500).send("itsss erorrrry bruhhh");
    }
})

module.exports = router; 