var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('adminHome');
});

// Add more admin routes as needed

module.exports = router;
