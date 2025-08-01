const express = require('express');
const router = express.Router();
const controller = require('../../controllers/floorplanController.js');

router.post('/', controller.addDetails);

module.exports = router;