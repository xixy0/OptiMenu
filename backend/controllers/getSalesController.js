const salesService = require('../services/getSalesService.js');

const fetchMonthlySales = async (req, res) => {
  try {
    const salesData = await salesService.getMonthlySales();
    console.log('Data fetched:', salesData);
    res.status(200).json(salesData);
  } catch (error) {
    console.error('Error in controller:', error);
    res.status(500).send('Error in processing...');
  }
};

module.exports = {
  fetchMonthlySales,
};
