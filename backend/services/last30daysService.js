const connection = require('../db');

const getLast30DaysRevenue = async () => {
  const query = `
    SELECT DATE_FORMAT(order_date, '%Y-%m-%d') AS day, SUM(price) AS total_price
    FROM orders
    GROUP BY day
    ORDER BY day DESC
    LIMIT 30
  `;

  try {
    const [rows] = await connection.query(query);
    return rows;
  } catch (error) {
    console.error('Error fetching revenue data:', error);
    throw error; // Propagate the error to the controller
  }
};

module.exports = {
  getLast30DaysRevenue,
};
