const service = require('../services/waiterPerformanceService.js');

const getDetails = async (req, res) => {
    try {
        const result = await service.getDetails(req);
        res.status(200).send({result});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error in processing...');
    }
};

module.exports = { getDetails };