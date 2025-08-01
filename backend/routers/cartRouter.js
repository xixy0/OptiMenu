const express = require('express');
const router = express.Router();
const connection = require('../db.js');
const { v4: uuidv4 } = require('uuid');
// Define order routes
router.post('/', async (req, res) => {
    try {
      console.log("hii")
        const uuid = uuidv4();
        const hexString = uuid.replace(/-/g, '');
        orderId =parseInt(hexString, 16)%10000 +1;
        console.log(req.body)
        const {username ,itemsToOrder} = req.body;
        console.log(itemsToOrder);
        console.log(username);
        const order_date = new Date().toISOString().slice(0, 10);
        const order_time = new Date().toLocaleTimeString('en-US', { hour12: false });
        const sql = 'INSERT INTO orders (itemname, price, quantity, order_time, order_date,user,order_id) VALUES ?';
        const values = [];
        for (const item of itemsToOrder) {
          if (item.name && item.quantity && item.price) {
            values.push([item.name, item.price, item.quantity, order_time, order_date,username,orderId]);
          } else {
            console.warn('Skipping invalid item:', item);
          }
        }
    
        if (values.length > 0) {
          // Use await with connection.query for INSERT operation
         // await connection.getConnection();
          const query = connection.format(sql, [values]);
         // const [results, fields] = await connection.query(sql, [values]);
         const [results, fields] = await connection.query(query);
          console.log('Data inserted into MySQL:', results);
          res.status(201).json({ message: 'Data inserted successfully' });
        } else {
          res.status(400).json({ error: 'No valid data to insert' });
        }
      } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
});

// router.get('/offers', (req, res) => {
//   // Offer fetching logic
// });

// Export the router
module.exports = router;