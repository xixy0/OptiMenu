
const connection = require('../db'); // Adjust the path as per your structure

const orderService = {
    getRecentOrderData: async () => {
        const query = `
            SELECT SUM(price) AS total_price, order_date, order_time, user, order_id
            FROM orders
            WHERE order_id IS NOT NULL
            GROUP BY order_id, order_date, order_time, user
            ORDER BY order_date desc
            LIMIT 15
        `;
        const [rows] = await connection.query(query);
        return rows;
    },
};

module.exports = orderService;
