// controllers/orderController.js
const orderService = require('../services/currentHourService');

const orderController = {
    getTotalPriceForCurrentHour: async (req, res) => {
        try {
            const currentDate = new Date(); // Define current date here
            const currentHour = currentDate.getHours();
            const date = currentDate.toISOString().slice(0, 10); // Get the date in YYYY-MM-DD format

            // Call the service to get total price for current hour
            const rows = await orderService.getTotalPriceForCurrentHour(currentHour, date);

            // Send the result as response
            res.status(200).json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error processing...');
        }
    },
};

module.exports = orderController;
