const express = require('express');
const router = express.Router();
const MenuUpdateController = require('../../controllers/MenuUpdateController');
const upload = require('../../middlewares/uploadMiddleware.js');

router.patch('/:id',upload.single("imageFile"), MenuUpdateController.UpdateMenu);

module.exports = router;