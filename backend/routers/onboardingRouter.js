const express = require('express');
const router = express.Router();




    const floorPlan = require('./OnboardingRouters/floorPlan.js');
    const restaurantDetails = require('./OnboardingRouters/restaurantDetails.js');
    const userRoles = require('./OnboardingRouters/userRoles.js');


    router.use('/floorplan',floorPlan);
    router.use('/restaurantDetails',restaurantDetails);
    router.use('/userRoles',userRoles);
  
  
 
  module.exports = router;
  