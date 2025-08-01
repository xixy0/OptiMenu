const express = require('express');
const router = express.Router();
const staffController = require('../../controllers/addstaffcontroller');
//giving avg of yesterday
// Route for fetching average price
router.post('/', staffController.addstaff);

module.exports = router;
