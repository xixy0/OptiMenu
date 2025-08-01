// services/ordersService.js
const connection = require('../db');

const ordersService = {
    getTotalPrice: async () => {
        const date = new Date().toISOString().slice(0, 10);  // Current date (YYYY-MM-DD)
        const query = 'SELECT SUM(price) AS total_price FROM orders WHERE order_date = ?';
        const [rows] = await connection.query(query, [date]);
        return rows;
    },
};

module.exports = ordersService;
