const express = require('express');
const router = express.Router();
const controller = require('../../controllers/waiterPerformanceController.js');

router.get('/', controller.getDetails);

module.exports = router;