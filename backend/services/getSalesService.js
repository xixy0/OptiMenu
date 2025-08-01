const connection = require('../db');

const getMonthlySales = async () => {
  const query = `
    SELECT SUM(quantity) AS sales 
    FROM orders 
    WHERE MONTH(order_date) = MONTH(CURDATE()) 
    AND YEAR(order_date) = YEAR(CURDATE())
  `;
  
  try {
    const [rows] = await connection.query(query);
    return rows;
  } catch (error) {
    console.error('Error fetching monthly sales:', error);
    throw error; // Propagate the error to the controller
  }
};

module.exports = {
  getMonthlySales,
};
