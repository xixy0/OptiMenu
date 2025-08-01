const connection = require('../db');

const ordersService = {
  getAveragePrice: async () => {
    const query = 'SELECT AVG(price) AS value FROM orders WHERE order_date = CURDATE()-1';
    try {
      const [rows] = await connection.query(query);
      return rows;
    } catch (error) {
      throw new Error('Database query failed: ' + error.message);
    }
  },
};

module.exports = ordersService;
