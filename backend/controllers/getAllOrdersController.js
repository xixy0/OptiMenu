// controllers/orderController.js
const orderService = require('../services/getAllOrdersService');

const orderController = {
    getRecentOrderData: async (req, res) => {
        try {
            // Call the service to get recent order data
            const rows = await orderService.getRecentOrderData();

            // Send the result as response
            res.status(200).json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error in processing...');
        }
    },
};

module.exports = orderController;
