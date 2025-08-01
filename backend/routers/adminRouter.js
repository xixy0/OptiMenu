const express = require('express');
const router = express.Router();
const connection = require('../db.js');
const cors = require('cors');
const app = express();
app.use(cors());

// Define admin routes
const addstaff = require('./AdminRouters/addstaff.js');
const editstaff = require('./AdminRouters/editUser.js')
const insertOffer = require('./AdminRouters/insertOffer.js');
const signIn = require('./AdminRouters/signIn');
const currentDay = require('./AdminRouters/currentDay.js');
const recent  = require('./AdminRouters/recent.js');
const comparison = require('./AdminRouters/comparison.js');
const mostSold = require('./AdminRouters/mostSoldToday.js');
const currentHour = require('./AdminRouters/currentHour.js'); 
const addMenu = require('./AdminRouters/addMenu.js');
const deleteMenu = require('./AdminRouters/deleteMenu.js');
const revenueBySlot = require('./AdminRouters/slotRevenue.js');
const totalRevenue = require('./AdminRouters/totalRevenue.js');
const totalSales = require('./AdminRouters/getSales.js');
const getAllOrder = require('./AdminRouters/getAllOrders.js');
const getOrder = require('./AdminRouters/getOrder.js');
const deleteuser = require('./AdminRouters/deleteUser.js');
const getallusers = require('./AdminRouters/getAllUsers.js');
const weeklyStats = require('./AdminRouters/weeklyStats.js');
const last30days = require('./AdminRouters/last30days.js');
const mostSoldweek = require('./AdminRouters/mostSoldWeek.js');
const mostSoldmonth = require('./AdminRouters/mostSoldItemMonth.js');
const monthlyrevenue = require('./AdminRouters/monthlyRevenue.js');
const weeklyrevenue = require('./AdminRouters/weeklyRevenue.js');
const login = require('./AdminRouters/login.js');
const average = require('./AdminRouters/averageOrder.js');
const onboarding = require('./AdminRouters/onboarding.js');
const updateMenu = require('./AdminRouters/updateMenu.js')

router.use('/addstaff',addstaff);
router.use('/editstaff',editstaff);
router.use('/login',login);
router.use('/addmenu',addMenu);
router.use('/insert',insertOffer);
router.use('/currentday',currentDay);
router.use('/recent',recent);
router.use('/signup',signIn);
router.use('/comparison',comparison);
router.use('/mostsolditem',mostSold);
router.use('/current_hour',currentHour);
router.use('/delete',deleteMenu);
router.use('/slotrevenue',revenueBySlot);
router.use('/totalrevenue',totalRevenue);
router.use('/getsales',totalSales);
router.use('/orders',getAllOrder);
router.use('/Orders/',getOrder);
router.use('/deleteuser',deleteuser);
router.use('/users',getallusers);
router.use('/weeklystats',weeklyStats);
router.use('/monthlystats',last30days);
router.use('/mostsolditemweek',mostSoldweek);
router.use('/mostsolditemmonth',mostSoldmonth);
router.use('/monthlyrevenue',monthlyrevenue);
router.use('/weeklyrevenue',weeklyrevenue);
router.use('/averageordervalue',average);
router.use('/onboarding',onboarding);   
router.use('/updateMenu',updateMenu)

// Export the router
module.exports = router;