const orderService = require('../services/getOrderService');

const orderController = {
    getOrderById: async (req, res) => {
        try {
            const { id } = req.params;
            const rows = await orderService.getOrderById(id);
            res.status(200).json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error in processing...');
        }
    },
};

module.exports = orderController;
