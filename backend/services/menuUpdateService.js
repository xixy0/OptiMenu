
const connection = require('../db');

const UpdateMenuById = (id,name , description, price, category,isVeg,imageFile) => {
  return new Promise((resolve, reject) => {
    console.log({id,name,description,price,category,isVeg,imageFile});
    if(imageFile){
    const imageUrl = `/images/${imageFile.filename}`;
    const realUrl = `http://localhost:5000${imageUrl}`;
}
    // Build the update query dynamically
    let query = 'UPDATE menu_items SET ';
    const fields = [];
    const values = [];
  
    if (name) {
      fields.push('name = ?');
      values.push(name);
    }
    if (description) {
      fields.push('description = ?');
      values.push(description);
    }

    if(isVeg){
        fields.push("isVeg = ?");
        if(isVeg ==='true')
        values.push(1);
        else values.push(0);
    }
    if(category){
        fields.push("category = ?");
        values.push(category);
    }

    if(price){
        fields.push("price = ?");
        values.push(price);
    }

    if(imageFile){
        fields.push("image = ?");
        values.push(realUrl);
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
  UpdateMenuById,
};