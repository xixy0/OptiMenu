
const billService = require('../services/getBillService.js');

const getBill = async (req, res) => {
    try{
        const {userId} = req.params;
        const rows = await billService.getBill(userId);
        console.log(rows);

         const transformOrders = (rows) => { //transforming fnctn
           // Map to store grouped orders by order_id
           const groupedOrders = {};
       
           rows.forEach(order => {
               const { order_id,tableName, user, itemName, price, quantity ,status ,order_date} = order;
       
               // If the order_id doesn't exist in the map, initialize it
               if (!groupedOrders[user]) {
                   groupedOrders[user] = {
                       id: order_id,
                       customerName: user, 
                       total: 0,
                       tableNumber: tableName,
                       createdAt: order_date,
                       items: [],

                   };
               }
       
               // Add the item to the items array
               groupedOrders[user].items.push({
                   name: itemName,
                   quantity: quantity,
                   Price: price * quantity ,// Update the price to reflect quantity
                   status: status
               });
       
               // Add to the total
               groupedOrders[user].total += price * quantity;
           });
       
           // Convert the map values to an array
           return Object.values(groupedOrders);
       };
   
       const transformedOrders = transformOrders(rows);
   
   
         res.status(200).json(transformedOrders);
       } catch(error){
           console.error(error);
           res.status(500).send('Error in processing...');
       }
    }

module.exports = { getBill };