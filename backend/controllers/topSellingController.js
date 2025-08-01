const topItemsService = require('../services/topSellingService.js');

exports.getTopItemsToday = async (req, res) => {
    try {
        const result = await topItemsService.fetchTopItems("today");
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching top items.');
    }
};

exports.getTopItemsWeek = async (req, res) => {
    try {
        const result = await topItemsService.fetchTopItems("week");
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching top items.');
    }
};

exports.getTopItemsMonth = async (req, res) => {
    try {
        const result = await topItemsService.fetchTopItems("month");
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching top items.');
    }
};

exports.getTopItemsYear = async (req, res) => {
    try {
        const result = await topItemsService.fetchTopItems("year");
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching top items.');
    }
};
