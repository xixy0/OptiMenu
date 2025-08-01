const express = require('express');
const router = express.Router();
const revenueController = require('../../controllers/last30daysController');

// Define the route
router.get('/', revenueController.fetchLast30DaysRevenue);

module.exports = router;
