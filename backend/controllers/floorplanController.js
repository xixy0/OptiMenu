const floorplanService = require('../services/floorplanService.js');

const addDetails = async (req, res) => {
    try {
        const val = req.body;
        console.log(val);
        const result = await floorplanService.addDetails(req);
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error in processing...');
    }
};

module.exports = { addDetails };