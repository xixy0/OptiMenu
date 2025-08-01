const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/getOrderController');

// Define the route for getting an order by ID
router.get('/:id', orderController.getOrderById);

module.exports = router;