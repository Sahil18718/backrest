const express = require("express")
const orderRoute = express.Router();

// Get all orders
orderRoute.get('/orders', (req, res) => {
    Order.find({})
      .populate('user')
      .populate('restaurant')
      .exec((err, orders) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          res(200).json(orders);
        }
      });
});
  
// Create a new order
orderRoute.post('/orders', (req, res) => {
  const order = new Order(req.body);
  order.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.sendStatus(204);
    }
  });
});

  module.exports={
    orderRoute
  }