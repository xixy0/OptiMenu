const slotService = require('../services/timeslotAnalysisService.js');

exports.getTimeslotAnalysisToday = async (req, res) => {
    try {
        const result = await slotService.getTimeslotAnalysis("today");
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error in processing...');
    }   
};

exports.getTimeslotAnalysisWeek = async (req, res) => {
    try {
        const result = await slotService.getTimeslotAnalysis("week");
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error in processing...');
    }   
};

exports.getTimeslotAnalysisMonth = async (req, res) => {
    try {
        const result = await slotService.getTimeslotAnalysis("month");
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error); 
        res.status(500).send('Error in processing...');
    }   
};

exports.getTimeslotAnalysisYear = async (req, res) => {
    try {
        const result = await slotService.getTimeslotAnalysis("year");
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error in processing...');
    }
};
