// routes/orderRoute.js
const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/getAllOrdersController');

// Define the route for getting recent order data
router.get('/', orderController.getRecentOrderData);

module.exports = router;
