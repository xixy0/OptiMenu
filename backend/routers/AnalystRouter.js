const express = require('express');
const router = express.Router();
const connection = require('../db.js');
const cors = require('cors');
const app = express();
app.use(cors());


    // Define admin routes
  const categoryPerformance = require('./AnalystRouters/categoryPerformance.js');
  const timeslot = require('./AnalystRouters/timeslotAnalysis.js');
  const topSelling = require('./AnalystRouters/topSelling.js');
  const conversion = require('./AnalystRouters/conversion.js');
  const itemPerOrder = require('./AnalystRouters/itemPerOrder.js');
   
    router.use('/itemPerformance', categoryPerformance);
    router.use('/timeSlotAnalysis',timeslot);
    router.use('/topselling',topSelling);
    router.use('/conversionrate',conversion);
    router.use('/itemsPerOrder',itemPerOrder);
    
    // Export the router
   
  


  module.exports = router;
  