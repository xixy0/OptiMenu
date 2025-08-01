
const ordersService = require('../services/currentDayService');

const getTotalPrice = async (req, res) => {
    try {
        const totalPrice = await ordersService.getTotalPrice();
        res.status(200).json(totalPrice);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error in processing...');
    }
};

module.exports = { getTotalPrice };
