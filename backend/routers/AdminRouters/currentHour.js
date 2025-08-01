const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/currentHourController');

// Define the route for getting total price for the current hour
router.get('/', orderController.getTotalPriceForCurrentHour);

module.exports = router;