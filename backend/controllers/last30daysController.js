const revenueService = require('../services/last30daysService.js');

const fetchLast30DaysRevenue = async (req, res) => {
  try {
    const revenueData = await revenueService.getLast30DaysRevenue();
    console.log('Data fetched:', revenueData);
    res.status(200).json(revenueData);
  } catch (error) {
    console.error('Error in controller:', error);
    res.status(500).send('Error in processing...');
  }
};

module.exports = {
  fetchLast30DaysRevenue,
};
