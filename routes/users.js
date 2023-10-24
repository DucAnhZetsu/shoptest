var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const UserModel = require('../model/UserModel'); // adjust the path as necessary

// Login route
router.post('/login', async function(req, res, next) {
  // Get the user from the database
  var user = await UserModel.findOne({ username: req.body.username });

  if (!user) {
    // User not found
    return res.status(400).send('Cannot find user');
  }

  // Check password
  var validPassword = await bcrypt.compare(req.body.password, user.password);
  if(validPassword) {
    // Redirect to main page after successful login
    res.redirect('/');
  } else {
    res.send('Not Allowed');
  }
});

// Register route
router.post('/register', async function(req, res, next) {
  // Check if the user already exists
  var userExists = await UserModel.findOne({ username: req.body.username });

  if (userExists) {
    return res.status(400).send('Username already exists');
  }

  // Hash the password
  var hashedPassword = await bcrypt.hash(req.body.password, 10);

  // Create a new user
  var user = new UserModel({
    username: req.body.username,
    password: hashedPassword
  });

  // Save the user to the database
  try {
    var savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
