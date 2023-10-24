var express = require('express');
var router = express.Router();
var ToyModel = require('../model/ToyModel'); // adjust the path as necessary

router.get('/home', async function(req, res) {
  try {
    var toys = await ToyModel.find({});
    res.render('home', { toys: toys });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
