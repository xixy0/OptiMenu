const express = require('express');
const router = express.Router();
const controller = require('../../controllers/orderlifecontroller.js');

router.get('/:userId', controller.orderlife);

module.exports = router;