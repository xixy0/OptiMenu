const express = require('express');
const router = express.Router();
const ordersController = require('../../controllers/averageOrderController');
//giving avg of yesterday
// Route for fetching average price
router.get('/', ordersController.fetchAveragePrice);

module.exports = router;
