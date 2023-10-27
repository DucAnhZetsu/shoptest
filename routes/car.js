var express = require('express');
var router = express.Router();

var CarModel = require('../model/CarModel');

router.get('/', async (req, res) => {
   var cars = await CarModel.find();
   res.render('Car/index', { cars: cars });
});

router.get('/add', (req, res) => {
   res.render('car/add');
});

router.post('/add', async (req, res) => {
   var car = req.body;
   await CarModel.create(car);
   console.log('Add car succeed !');
   res.redirect('/car');
});

router.get('/detail/:id', async (req, res) => {
   var id = req.params.id;
   var car = await CarModel.findById(id);
   res.render('car/detail', { car: car });
});

router.get('/detail/:id', async (req, res) => {
   var id = req.params.id;
   var car = await CarModel.findById(id);
   res.render('car/detail', { car: car });
});

router.get('/delete/:id', async (req, res) => {
   var id = req.params.id;
   await CarModel.findByIdAndDelete(id);
   console.log('Delete car succeed');
   res.redirect('/car');
});

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var car = await CarModel.findById(id);
   res.render('car/edit', { car: car })
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var car = req.body;
   await CarModel.findByIdAndUpdate(id, car);
   console.log('Update car succeed !');
   res.redirect('/car');
})

router.post('/search', async (req, res) => {
   var keyword = req.body.name;
   var cars = await CarModel.find({ name: new RegExp(keyword, "i") });
   res.render('car/index', { cars: cars });
})

router.get('/nameasc', async (req, res) => {
   var cars = await CarModel.find().sort({ name: 1 });
   res.render('car/index', { cars: cars });
})

router.get('/namedesc', async (req, res) => {
   var cars = await CarModel.find().sort({ name: -1 });
   res.render('car/index', { cars: cars });
})

module.exports = router;
