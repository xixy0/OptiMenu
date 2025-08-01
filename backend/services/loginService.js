const connection = require('../db');

const getAdminByEmail = async (email) => {
  const sql = 'SELECT * FROM admin WHERE email = ?';
  const formattedSql = connection.format(sql, [email]);
  try {
    const [rows] = await connection.query(formattedSql);
    return rows;
  } catch (error) {
    console.error('Error fetching admin by email:', error);
    throw error; // Propagate the error to the controller
  }
};

const verifyPassword = (inputPassword, storedPassword) => {
  // In production, replace this with bcrypt.compare() for secure password comparison
  return inputPassword === storedPassword;
};

module.exports = {
  getAdminByEmail,
  verifyPassword,
};
