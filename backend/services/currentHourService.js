const connection = require('../db'); 

const orderService = {
    getTotalPriceForCurrentHour: async (currentHour, date) => {
        const query = 'SELECT SUM(price) AS total_price FROM orders WHERE LEFT(order_time, 2) = ? AND order_date = ?';
        const [rows] = await connection.query(query, [currentHour, date]);
        return rows;
    },
};

module.exports = orderService;