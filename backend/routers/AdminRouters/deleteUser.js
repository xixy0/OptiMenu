const express = require('express');
const router = express.Router();
const staffController = require('../../controllers/deletestaffController');

router.delete('/:id', staffController.deleteStaff);

module.exports = router;
