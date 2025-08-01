const express = require('express');
const router = express.Router();
const connection = require('../db.js');
const cors = require('cors');
const app = express();
app.use(cors());


const orders = (io) => {
    // Define admin routes
    const activeOrder = require('./OrderRouters/activeOrder.js');
    const updateOrder = require('./OrderRouters/updateStatus.js');
    const verifiedOrder = require("./OrderRouters/verifiedOrder.js");
    const toWaiter = require("./OrderRouters/waiterOrder.js");
    const cancel = require('./OrderRouters/cancelOrder.js');
    const completedOrder = require('./OrderRouters/accountant.js');
    const orderlife = require('./OrderRouters/orderlife.js');
    const getBill = require('./OrderRouters/getBill.js');
  
    router.use('/steward', activeOrder);
    router.use('/updateStatus', updateOrder(io));
    router.use('/cook',verifiedOrder);
    router.use('/waiter',toWaiter);
    router.use('/accountant',completedOrder);
    router.use('/cancelOrder',cancel(io));
    router.use('/orderlife',orderlife);
    router.use('/bills',getBill);
  
    // Return the router
    return router;
  };
  module.exports = orders;
  