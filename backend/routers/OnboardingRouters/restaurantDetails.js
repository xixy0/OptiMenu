const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/uploadMiddleware.js')
const controller = require('../../controllers/addrestaurantDetails.js');

router.post('/', upload.single("logo") ,controller.addDetails);

module.exports = router;