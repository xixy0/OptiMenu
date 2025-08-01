const express = require('express');
const router = express.Router();
const connection = require('../../db');

const timeslotAnalysisController = require('../../controllers/timeslotAnalysisController');

router.get("/today", timeslotAnalysisController.getTimeslotAnalysisToday)
router.get("/week", timeslotAnalysisController.getTimeslotAnalysisWeek)
router.get("/month", timeslotAnalysisController.getTimeslotAnalysisMonth);
router.get("/year", timeslotAnalysisController.getTimeslotAnalysisYear);

module.exports = router;