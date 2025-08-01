// to update the order status at various ends and to emit the updated order to the respective ends.

const express = require("express");
const router = express.Router();
const connection = require("../../db");

const updateOrder = (io) => {
  router.post("/", async (req, res) => {
    try {
      console.log("updateOrder");
      // query = ' SELECT itemName, price, SUM(quantity) AS totalQuantity,order_date from ordered GROUP BY itemName, price,order_date';
      //  query = 'select * from active_order where status = "active" and order_id = ?';
      const { id, status, itemName } = req.body;
      console.log(itemName);
      //  const [rows, fields] = await connection.query(query,[id])
      //  console.log(id)
      //  console.log("Data fetched : ", rows);

      if (status === "verified") {
        // Transform the rows to exclude the 'status' column
        // const query =
        //   'select * from active_order where status = "active" and order_id = ? ';
        // const [rows, fields] = await connection.query(query, [id]);
        // const transformedOrders = rows.map((row) => {
        //   const { status, ...rest } = row; // Destructure to exclude 'status'
        //   return Object.values(rest);
        // });

        // const rest = transformedOrders;
        // //console.log(rest)
        const query3 =
          'UPDATE active_order SET status = "verified" WHERE order_id = ? ';
        //const query2 = 'insert into orders values ?'
        //const sql = connection.format(query2, [rest]);
        const sql2 = connection.format(query3, [id]);
        // const [results, fields] = await connection.query(sql2, [values]);
        // const [results, fields2] = await connection.query(sql);

        const [Results, fields3] = await connection.query(sql2);
        io.emit("order-updated");
        io.emit("status-updated");
        res.status(200).json(Results);
      } else if (status === "approved") {
        console.log(id);
        // Transform the rows to exclude the 'status' column
        // const query =
        //   'select * from active_order where status = "verified" and order_id = ? ';
        // const [rows, fields] = await connection.query(query, [id, itemName]);
        // const transformedOrders = rows.map((row) => {
        //   const { status, ...rest } = row; // Destructure to exclude 'status'
        //   return Object.values(rest);
        // });

        // const rest = transformedOrders;
        console.log("from here");
       // console.log(rest);
        const query3 =
          'UPDATE active_order SET status = "approved" WHERE order_id = ? ';
        //const query2 = 'insert into orders values ?'
        // const sql = connection.format(query2, [rest]);
        const sql2 = connection.format(query3, [id, itemName]);
        // const [results, fields] = await connection.query(sql, [values]);
        // const [results, fields2] = await connection.query(sql);
        const [Results, fields3] = await connection.query(sql2);
        io.emit("approved");
        io.emit("status-updated");
        res.status(200).json(Results);
      } else if (status === "completed") {
        console.log(id);
        console.log(itemName);
        // Transform the rows to exclude the 'status' column
        // const query =
        //   'select * from active_order where status = "approved" and order_id = ?';
        // const [rows, fields] = await connection.query(query, [id]);
        // const transformedOrders = rows.map((row) => {
        //   const { status, ...rest } = row; // Destructure to exclude 'status'
        //   return Object.values(rest);
        // });

        // const rest = transformedOrders;
        // console.log("from here");
        // console.log(rest);
        const query3 =
          'UPDATE active_order SET status = "cooked" WHERE order_id = ? and itemName =?';
        //const query2 = 'insert into orders values ?'
        // const sql = connection.format(query2, [rest]);
        const sql2 = connection.format(query3, [id, itemName]);
        // const [results, fields] = await connection.query(sql, [values]);

        // const [results, fields2] = await connection.query(sql);
        const [Results, fields3] = await connection.query(sql2);
        io.emit("cooked");
        io.emit("status-updated");
        res.status(200).json(Results);
      } else if (status === "delivered") {
        console.log(id);
        console.log(status);
        // Transform the rows to exclude the 'status' column
        // const query =
        //   'select * from active_order where status = "cooked" and order_id = ?';
        // const [rows, fields] = await connection.query(query, [id]);
        // const transformedOrders = rows.map((row) => {
        //   const { status, ...rest } = row; // Destructure to exclude 'status'
        //   return Object.values(rest);
        // });

        // const rest = transformedOrders;
        // console.log("from here");
        // console.log(rest);
        const query3 =
          'UPDATE active_order SET status = "delivered" WHERE order_id = ? and itemName = ?';
        // const query2 = 'insert into orders values ?'
        // const sql = connection.format(query2, [transformedOrders]);
        const sql2 = connection.format(query3, [id, itemName]);
        // const [results, fields] = await connection.query(sql, [values]);

        // const [results, fields2] = await connection.query(sql);
        const [Results, fields3] = await connection.query(sql2);
        io.emit("status-updated");
        res.status(200).json(Results);
      } else if (status === "paid") {
        console.log("hiii for accountant");
        console.log(id);
        console.log(status);
        // Transform the rows to exclude the 'status' column
        const query =
          'select * from active_order where status = "delivered" and order_id = ?';
        const [rows, fields] = await connection.query(query, [id]);
        const transformedOrders = rows.map((row) => {
          const { status, ...rest } = row; // Destructure to exclude 'status'
          return Object.values(rest);
        });

        const rest = transformedOrders;
        console.log("from here");
        console.log(rest);
        const query3 =
          'UPDATE active_order SET status = "paid" WHERE order_id = ?';
        const query2 = "insert into orders values ?";
        const sql = connection.format(query2, [rest]);
        const sql2 = connection.format(query3, [id]);
        // const [results, fields] = await connection.query(sql, [values]);
         io.emit('status-updated');
        const [results, fields2] = await connection.query(sql);
        console.log(results);
        const [Results, fields3] = await connection.query(sql2);
        res.status(200).json(Results);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Error in processing...");
    }
  });
  return router;
};

module.exports = updateOrder;
