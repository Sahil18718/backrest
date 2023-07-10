const express = require("express")
const restaurantroute = express.Router();


// Get all restaurants
restaurantroute.get('/restaurants', (req, res) => {
    Restaurant.findOne({}, (err, restaurants) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(restaurants);
      }
    });
  });
  
// Create a new restaurant
restaurantroute.post('/restaurants', (req, res) => {
const restaurant = new Restaurant(req.body);
restaurant.save((err) => {
    if (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
    } else {
    res.sendStatus(201);
    }
});
});


module.exports={
    restaurantroute
}