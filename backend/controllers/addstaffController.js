const staffservice = require('../services/addstaffService');

const addstaff = async (req, res) => {
    try {
        const result = await staffservice.addstaffservice(req);
        res.status(200).send("success");
    } catch (error) {
        console.error(error);
        res.status(500).send('Error in processing...');
    }
};

module.exports = { addstaff };