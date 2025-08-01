const express = require('express');
const router = express.Router();
const controller = require('../../controllers/cookPerformanceController.js');

router.post('/', controller.getDetails);

module.exports = router;