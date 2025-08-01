// to be shown at the waiters panel
const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.get('/', async (req, res) => {
    try{
     // query = ' SELECT itemName, price, SUM(quantity) AS totalQuantity,order_date from ordered GROUP BY itemName, price,order_date';
     query = 'select * from active_order where status = "cooked" ';
      const [rows, fields] = await connection.query(query)
      console.log("Data fetched : ", rows);

      const transformOrders = (rows) => { //transforming fnctn
        // Map to store grouped orders by order_id
        const groupedOrders = {};
    
        rows.forEach(order => {
            const { order_id, user, itemName, price, quantity ,tableName } = order;
    
            // If the order_id doesn't exist in the map, initialize it
            if (!groupedOrders[order_id]) {
                groupedOrders[order_id] = {
                    id: order_id,
                    customerName: user, 
                    total: 0,
                    items: [],
                    tableName : tableName
                };
            }
    
            // Add the item to the items array
            groupedOrders[order_id].items.push({
                name: itemName,
                quantity: quantity,
                price: price * quantity // Update the price to reflect quantity
            });
    
            // Add to the total
            groupedOrders[order_id].total += price * quantity;
        });
    
        // Convert the map values to an array
        return Object.values(groupedOrders);
    };

    const transformedOrders = transformOrders(rows);


      res.status(200).json(transformedOrders);
    }
    catch(error){
        console.error(error);
        res.status(500).send('Error in processing...');
    }
    })

    module.exports = router;