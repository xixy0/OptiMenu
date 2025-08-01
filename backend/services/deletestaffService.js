const connection = require('../db');

const deleteStaffById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM staff WHERE id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

module.exports = {
  deleteStaffById,
};
