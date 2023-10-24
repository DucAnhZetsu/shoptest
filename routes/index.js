var express = require('express');
var router = express.Router();

// Import your models
const UserModel = require('../model/UserModel');
const ToyModel = require('../model/ToyModel');
const EmployeeModel = require('../model/EmployeeModel');

// Route for the home page
router.get('/', (req, res) => {
  console.log('GET /');
  res.render('index');
});

// Route for user login
router.post('/', async (req, res) => {
  var login = await UserModel.findOne({
    username: req.body.username,
    password: req.body.password
  });

  if (login) { // login successful
    res.redirect('/home'); // Redirect to home page
  } else { // login failed
    res.redirect('/');
  }
});


// Route for adding a new toy

// // Route for displaying toy details
// router.get('/toy/:id', async function(req, res, next) {
//   var toy = await ToyModel.findById(req.params.id); // Fetch the toy from the database

//   if (toy) {
//     res.render('toyDetail', { toy: toy }); // Render a view that displays the toy's details
//   } else {
//     next(createError(404)); // If the toy doesn't exist, forward a 404 error
//   }
// });

// // Route for displaying all toys
// router.get('/home', async function(req, res, next) {
//   var toys = await ToyModel.find(); // Fetch all toys from the database

//   res.render('home', { toys: toys }); // Pass the toys to the home view
// });

module.exports = router;
