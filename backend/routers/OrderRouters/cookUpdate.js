const express = require('express');
const router = express.Router();
const connection = require('../../db');

const updateOrder = (io) =>{
router.post('/', async (req, res) => {
    try{
     // query = ' SELECT itemName, price, SUM(quantity) AS totalQuantity,order_date from ordered GROUP BY itemName, price,order_date';
     query = 'select * from active_order where status = "active" and order_id = ?';
     const {id ,status}= req.body;
     const [rows, fields] = await connection.query(query,[id])
     console.log(id)
     console.log("Data fetched : ", rows);
    if(status ==='verified'){
     // Transform the rows to exclude the 'status' column
    const transformedOrders = rows.map(row => {
            const { status, ...rest } = row; // Destructure to exclude 'status'
            return Object.values(rest);
     });
    
    const rest = transformedOrders
    //console.log(rest)
    const query3 = 'UPDATE active_order SET status = "approved" WHERE order_id = ?';
    const query2 = 'insert into orders values ?'
    const sql = connection.format(query2, [rest]);
    const sql2 = connection.format(query3, [id]);
    // const [results, fields] = await connection.query(sql, [values]);
    io.emit('order-updated', rest);
    const [results, fields2] = await connection.query(sql); 
    const [Results, fields3] = await connection.query(sql2); 
      res.status(200).json(results);
    }
}
    catch(error){
        console.error(error);
        res.status(500).send('Error in processing...');
    }
    });
    return router;

};

    module.exports = updateOrder;