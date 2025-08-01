const express = require('express');
const router = express.Router();
const controller = require('../../controllers/getBillController.js');

router.get('/:userId', controller.getBill);

module.exports = router;