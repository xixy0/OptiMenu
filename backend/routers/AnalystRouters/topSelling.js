const express = require('express');
const router = express.Router();
const topItemsController = require('../../controllers/topSellingController.js');

router.get('/today', topItemsController.getTopItemsToday);
router.get('/week', topItemsController.getTopItemsWeek);
router.get('/month', topItemsController.getTopItemsMonth);
router.get('/year', topItemsController.getTopItemsYear);



module.exports = router;
