const express = require('express');
const router = express.Router();
const staffController = require('../../controllers/editStaffController');

router.patch('/:id', staffController.EditStaff);

module.exports = router;
