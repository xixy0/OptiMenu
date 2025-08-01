const express = require('express');
const router = express.Router();
const connection = require('../../db');

const cancelOrder = (io) =>{
router.post('/', async (req, res) => {
    try{
        console.log("cancelOrder")
 
        const id= req.body.orderId;
        console.log(id.orderId)
        const query = 'UPDATE active_order SET status = "declined" WHERE order_id = ?';
        const sql = connection.format(query, [id.orderId]);
        io.emit('order-cancelled', id);
        const [Results, fields3] = await connection.query(sql); 
        res.status(200).json(Results);
    }
    catch(error){
        console.error(error);
        res.status(500).send('Error in processing...');
    }
    });
    
    return router;
}

    module.exports = cancelOrder;