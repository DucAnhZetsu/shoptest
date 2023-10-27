var express = require('express');
var router = express.Router();
var ToyModel = require('../model/ToyModel'); // adjust the path as necessary
var CarModel = require('../model/CarModel');

router.get('/home', async function(req, res) {
  try {
    var toys = await ToyModel.find({});
    var cars = await CarModel.find({});
    res.render('home', { toys: toys, cars: cars });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
