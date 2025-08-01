const express = require('express');
const router = express.Router();
const connection = require('../db.js');
const { v4: uuidv4 } = require('uuid');

// Pass the Socket.IO instance to this module
const initializeOrderRoutes = (io) => {
  // Define order routes
  router.post('/', async (req, res) => {
    try {
      console.log("hii");
      const uuid = uuidv4();
      const hexString = uuid.replace(/-/g, '');
      const orderId = parseInt(hexString, 16) % 10000 + 1;
      console.log(req.body);

      const { itemsToOrder ,note , tableId,user} = req.body;
      console.log(itemsToOrder);
      //console.log(username);

      const order_date = new Date().toISOString().slice(0, 10);
      const order_time = new Date().toLocaleTimeString('en-US', { hour12: false });
      tableName = parseInt(tableId)
      const sql = 'INSERT INTO active_order (itemname, price, quantity, order_time, order_date, user, order_id,status,note,tableId,tableName) VALUES ?';
      const values = [];

      for (const item of itemsToOrder) {
        if (item.name && item.quantity && item.price) {
          values.push([item.name, item.price, item.quantity, order_time, order_date, user, orderId,"active",note,tableId,tableName]);
        } else {
          console.warn('Skipping invalid item:', item);
        }
      }
      

      if (values.length > 0) {
        const query = connection.format(sql, [values]);
        const [results, fields] = await connection.query(query);
        console.log('Data inserted into MySQL:', results);

        // Emit the new order event via Socket.IO
        io.emit('new-order', {
          orderId,
          user,
          itemsToOrder,
          order_date,
          order_time,
          note
        });

        res.status(201).json({ message: 'Data inserted successfully', orderId });
      } else {
        res.status(400).json({ error: 'No valid data to insert' });
      }
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
};

module.exports = initializeOrderRoutes;
