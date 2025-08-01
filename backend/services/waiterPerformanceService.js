const connection = require('../db');

const waiterPerformance = {
  getDetails: async (req) => {
    //const values = req.body.values
    const detailsQuery= ` SELECT s.id as waiterId,
    s.name, 
    COUNT(DISTINCT w.orderId) AS completedOrders, 
    COUNT(DISTINCT c.orderId) AS cancelledOrders
FROM staff AS s
JOIN waiterStats AS w ON w.waiterId = s.id
LEFT JOIN cancelledOrder AS c ON c.initiator = s.id
GROUP BY s.id, s.name;
`;
    const performanceQuery = `SELECT 
    waiterId,
    COUNT(CASE WHEN deliver_time BETWEEN '06:00:00' AND '11:59:59' THEN 1 END) AS morningPerformance,
    COUNT(CASE WHEN deliver_time BETWEEN '12:00:00' AND '17:59:59' THEN 1 END) AS afternoonPerformance,
    COUNT(CASE WHEN deliver_time BETWEEN '18:00:00' AND '23:59:59' THEN 1 END) AS eveningPerformance
FROM waiterStats
GROUP BY waiterId;
` ;
    try {
      const [details] = await connection.query(detailsQuery);
      const [performance] = await connection.query(performanceQuery);
      console.log("performance", performance);
      console.log("details", details);

      if (details.length > 0 && performance.length > 0) {
        const mergedData = [...performance, ...details].reduce((acc, obj) => {
          if (!obj.waiterId) return acc; // Ignore objects without waiterId
        
          acc[obj.waiterId] = { ...acc[obj.waiterId], ...obj };
          return acc;
        }, {});
        
        console.log(Object.values(mergedData)); // Convert merged object into an array
         // Merging both results into a single object
         return Object.values(mergedData);
      } else {
        return []; // Return an empty array if no data found
      }
      
    } catch (error) {
      throw new Error('Database query failed: ' + error.message);
    }
  },
};

module.exports = waiterPerformance;