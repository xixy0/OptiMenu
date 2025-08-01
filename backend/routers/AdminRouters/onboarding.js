const express = require('express');
const router = express.Router();
const connection = require('../../db');
const multer = require("multer");

const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //   cb(null, "uploads/"); // Directory to store uploaded files
    // },
    // filename: (req, file, cb) => {
    //   cb(null, Date.now() + "-" + file.originalname); // Rename file
    // },
  });
  
  const upload = multer({ storage });



router.post('/', upload.any(),async (req,res)=>{
    try{
        const restaurantData = JSON.parse(JSON.stringify(req.body));
        console.log("Restaurant Details:", restaurantData.restaurantDetails);
        console.log("Menu Items:", restaurantData.menuItems);
        console.log("Floor Plan:", restaurantData.floorPlan);
        console.log("Users:", restaurantData.users);
        console.log("restaurantData:", restaurantData);

        RestQuery ='INSERT INTO restaurant (name,address,phone,email) VALUES (?,?,?,?)';
        connection.query(RestQuery,[restaurantData.restaurantDetails.name,restaurantData.restaurantDetails.address,restaurantData.restaurantDetails.phone,restaurantData.restaurantDetails.email],(err,rows,fields)=>{
            if(err){
                console.log(err);
                res.status(500).send("Error in inserting restaurant details");
            }
            else{
                console.log("Restaurant Details inserted successfully");
            }
        });

        const menuItems = restaurantData.menuItems.map(item => [
            item.name,
            item.price,
            item.category,
            item.description,
            restaurantData.restaurantDetails.name
          ]);
          

        MenuQuery ='INSERT INTO menu_items (name,price,category,description,restName) VALUES ?';
        connection.query(MenuQuery,[menuItems],(err,rows,fields)=>{
            if(err){
                console.log(err);
                res.status(500).send("Error in inserting restaurant details");
            }
            else{
                console.log("Restaurant Details inserted successfully");
            }
        });

        const floorPlan = restaurantData.floorPlan.map(table => [
            restaurantData.restaurantDetails.name,
            table.tableCount
            ]);
      FloorQuery ='INSERT INTO floor (restName,tableCount) VALUES ?';
        connection.query(FloorQuery,[floorPlan],(err,rows,fields)=>{
            if(err){
                console.log(err);
                res.status(500).send("Error in inserting restaurant details");
            }
            else{
                console.log("Restaurant Details inserted successfully");
            }
        });


        const users = restaurantData.users.map(user => [
            user.name,
            user.email,
            user.password,
            user.role,
            restaurantData.restaurantDetails.name
            ]);

        UserQuery ='INSERT INTO staff (name,email,password,role,restName) VALUES ?';
        connection.query(UserQuery,[users],(err,rows,fields)=>{
            if(err){
                console.log(err);
                res.status(500).send("Error in inserting restaurant details");
            }
            else{
                console.log("Restaurant Details inserted successfully");
            }
        });

        // Access uploaded files
        console.log("Files:", req.files);
        console.log(req.body.restaurantDetails);
        res.status(200).json({ message: "FormData received successfully" });
          


    }
    catch(error){
        console.log(error);
        res.status(500).send("itsss erorrrry bruhhh");
    }
})
module.exports = router; 