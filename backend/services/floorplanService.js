const connection = require('../db');

const floorplanService = {
  addDetails: async (req) => {
    const values = req.body;
    console.log("Received Data:", req.body);
    var plan =[];
     console.log(values.floors.length)
    for(let i=0;i<values.floors.length;i++){
      for(let j =0;j<values.floors[i].tables.length;j++){
       plan[j] = [values.floors[i].restId,values.floors[i].name,j,values.floors[i].tables[j].capacity];
            }
    }
   // console.log(plan)
    const query = 'insert into floor values ?';
    try {
      const [rows] = await connection.query(query,[plan]);
      return rows;
    } catch (error) {
      throw new Error('Database query failed: ' + error.message);
    }
  },
};

module.exports = floorplanService;