const connection = require('../db');

const restaurantDetailsService = {
  addDetails: async (name,phone,address,email,logo) => {
    
    if (!logo) {
      throw new Error("No file uploaded");
    }
  
    const imageUrl = `/images/${logo.filename}`;
    const realUrl = `http://localhost:5000${imageUrl}`;
    console.log('Real URL = ',realUrl);
    const values =[name,phone,address,email,realUrl]
    console.log("Received Data:", { name, phone, address, email, realUrl });
    const query = 'insert into restaurant(name,phone,address,email,logo) values (?,?,?,?,?)';
    try {
      const [rows] = await connection.execute(query,values);
      console.log('Rows = ',rows.insertId);
      return rows.insertId;
    } catch (error) {
      throw new Error('Database query failed: ' + error.message);
    }
  },
};

module.exports = restaurantDetailsService;