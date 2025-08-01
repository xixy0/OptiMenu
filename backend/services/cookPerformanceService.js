const connection = require('../db');

const cookPerformance = {
  getDetails: async (req) => {
    const values = req.body
    const avgprep = `SELECT 
    cookId, 
    SEC_TO_TIME(AVG(TIME_TO_SEC(order_completed) - TIME_TO_SEC(order_recieved))) AS avg_cooking_time 
    FROM cookStats
    WHERE order_completed IS NOT NULL AND order_recieved IS NOT NULL
    GROUP BY cookId;
`;
const detailsQuery= ` SELECT s.id as cookId,
s.name, 
COUNT(DISTINCT cook.order_id) AS completedOrders, 
COUNT(DISTINCT c.orderId) AS cancelledOrders
FROM staff AS s
JOIN cookStats AS cook ON cook.cookId = s.id
LEFT JOIN cancelledOrder AS c ON c.initiator = s.id
GROUP BY s.id, s.name;
`;
const performanceQuery = `SELECT 
cookId,
COUNT(CASE WHEN order_completed BETWEEN '06:00:00' AND '11:59:59' THEN 1 END) AS morningPerformance,
COUNT(CASE WHEN order_completed BETWEEN '12:00:00' AND '17:59:59' THEN 1 END) AS afternoonPerformance,
COUNT(CASE WHEN order_completed BETWEEN '18:00:00' AND '23:59:59' THEN 1 END) AS eveningPerformance
FROM cookStats
GROUP BY cookId;
` ;
    try {
      const [avg] = await connection.query(avgprep);
      const [details] = await connection.query(detailsQuery);
      const [performance] = await connection.query(performanceQuery);
      console.log("avgprep",avg);
      console.log("performance", performance);
      console.log("details", details);

      // if (details.length > 0 && performance.length > 0 ) {
        const mergedData = [...performance, ...details ,...avg].reduce((acc, obj) => {
          if (!obj.cookId) return acc; // Ignore objects without cookId
        
          acc[obj.cookId] = { ...acc[obj.cookId], ...obj };
          return acc;
        }, {});
        
        console.log(Object.values(mergedData)); // Convert merged object into an array
         // Merging both results into a single object
         return Object.values(mergedData);
      // } else {
      //   return []; // Return an empty array if no data found
      // }
    } catch (error) {
      throw new Error('Database query failed: ' + error.message);
    }
  },
};

module.exports = cookPerformance;