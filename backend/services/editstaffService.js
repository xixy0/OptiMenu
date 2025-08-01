const connection = require('../db');

const editStaffById = (id,req) => {
  return new Promise((resolve, reject) => {
    const { name, email ,role} = req.body;

    // Build the update query dynamically
    let query = 'UPDATE users SET ';
    const fields = [];
  
    if (name) {
      fields.push('name = ?');
      values.push(name);
    }
    if (email) {
      fields.push('email = ?');
      values.push(email);
    }

    if(role){
        fields.push("role = ?");
        values.push(role);
    }
    
    query += fields.join(', ') + ' WHERE id = ?';
    values.push(id);
   connection.query(query, values, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

module.exports = {
  editStaffById,
};
