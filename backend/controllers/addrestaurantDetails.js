const restaurantDetailsService = require('../services/addrestaurantDetailsService.js');

const addDetails = async (req, res) => {
    try {
        const { name,phone,address,email} = req.body;
        const logo = req.file;
        console.log("file" ,req.file);
        console.log("Received Data:", { name, phone, address, email });
        const result = await restaurantDetailsService.addDetails(name,phone,address,email,logo);
        console.log("result: ",result);
        res.status(200).send({ id: result, message: "Restaurant added successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error in processing...');
    }
};

module.exports = { addDetails };