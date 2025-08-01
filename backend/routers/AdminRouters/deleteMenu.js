const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM menu_items WHERE id =?';
  
    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error deleting item:', err);
        res.status(500).send('Error deleting item');
        return;
      }
      console.log('Item deleted successfully');
      res.status(200).send('Item deleted successfully');
    });
  });

  module.exports = router;