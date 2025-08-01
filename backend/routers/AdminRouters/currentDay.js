// routers/ordersRouter.js
const express = require('express');
const router = express.Router();
const controller = require('../../controllers/currentDayController');

// Route for getting the total price for today's orders
router.get('/', controller.getTotalPrice);

module.exports = router;
