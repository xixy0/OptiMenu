const express = require('express');
const router = express.Router();
const controller = require('../../controllers/stewardPerformanceController.js');

router.post('/', controller.getDetails);

module.exports = router;