const express = require('express');
const router = express.Router();
const socketIo = require('socket.io');

router.post('/', async (req, res) => {
    try{
  const {username :dataa,itemsToOrder:dataaaa} = req.body;
  console.log(req.body);
  console.log(dataa);
  console.log(dataaaa);
  const io = socketIo();
  io.emit('newOrder', { dataa, dataaaa });
  res.status(201).json({ message: 'Data inserted successfully' });
    }
    catch(error){
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal server error' }); 
    }
});

module.exports = router;