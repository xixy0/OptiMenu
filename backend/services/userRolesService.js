const connection = require('../db');

const userService = {
  addDetails: async (req) => {
    const values = req.body
    const query = 'insert into users values ?';
    try {
      const [rows] = await connection.query(query,[values]);
      return rows;
    } catch (error) {
      throw new Error('Database query failed: ' + error.message);
    }
  },
};

module.exports = userService;