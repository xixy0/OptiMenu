const express = require('express');
const router = express.Router();
const ordersController = require('../../controllers/getSalesController');

// Define the route
router.get('/', ordersController.fetchMonthlySales);

module.exports = router;
