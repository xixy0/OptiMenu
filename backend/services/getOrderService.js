const connection = require('../db'); 

const orderService = {
    getOrderById: async (orderId) => {
        const query = 'SELECT * FROM orders WHERE order_id = ?';
        const [rows] = await connection.query(query, [orderId]);
        return rows;
    },
};

module.exports = orderService;
