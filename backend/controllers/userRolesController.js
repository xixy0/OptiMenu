const userService = require('../services/userRolesService.js');

const addDetails = async (req, res) => {
    try {
        const result = await userService.addDetails(req);
        res.status(200).send("success");
    } catch (error) {
        console.error(error);
        res.status(500).send('Error in processing...');
    }
};

module.exports = { addDetails };