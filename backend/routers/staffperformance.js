const express = require('express');
const router = express.Router();
const connection = require('../db.js');
const cors = require('cors');
const app = express();
app.use(cors());



    // Define admin routes
    const waiterperformance = require('./StaffPerformance/waiterPerformance.js');
    const cookperformance  = require('./StaffPerformance/cookPerformance.js');


    router.use('/waiterPerfromance',waiterperformance);
    router.use('/cookperformance',cookperformance);
  
  
 
  module.exports = router;
  