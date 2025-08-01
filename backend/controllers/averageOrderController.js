const avgordersService = require('../services/averageOrderService');

const ordersController = {
  fetchAveragePrice: async (req, res) => {
    try {
      const result = await avgordersService.getAveragePrice();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error in processing...');
    }
  },
};

module.exports = ordersController;
