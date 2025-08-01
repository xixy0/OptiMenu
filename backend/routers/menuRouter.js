const express = require('express');
const router = express.Router();
const connection = require('../db.js');
const cors = require('cors');
const app = express();
app.use(cors());
// Define admin routes
// router.post('/', (req, res) => {
//   // Admin data insertion logic
// });

router.get('/', async (req, res) => {
  try{
    // query = ' SELECT itemName, price, SUM(quantity) AS totalQuantity,order_date from ordered GROUP BY itemName, price,order_date';
    query = 'select * from menu_items'
     const [rows, fields] = await connection.query(query)
     console.log("Data fetched : ", rows);
     res.status(200).json(rows);
   }
   catch(error){
       console.error(error);
       res.status(500).send('Error in processing...');
   }
   })

// router.get('/admin', (req, res) => {
//   // Admin data fetching logic
// });

// Export the router
module.exports = router;