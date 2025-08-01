const connection = require('../db');

const getorderlife = async (userId) => {
     const query = ' SELECT * from active_order where status!= "paid" and user = ?';
    const [rows] = await connection.query(query,[userId]);
    return rows;

} 

module.exports = { getorderlife };