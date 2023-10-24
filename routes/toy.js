var express = require('express');
var router = express.Router();

var ToyModel = require('../model/ToyModel');

router.get('/', async (req, res) => {
   var toys = await ToyModel.find();
   res.render('toy/index', { toys: toys });
});

router.get('/add', (req, res) => {
   res.render('toy/add');
});

router.post('/add', async (req, res) => {
   var toy = req.body;
   await ToyModel.create(toy);
   console.log('Add toy succeed !');
   res.redirect('/toy');
});

router.get('/detail/:id', async (req, res) => {
   var id = req.params.id;
   var toy = await ToyModel.findById(id);
   res.render('toy/detail', { toy: toy });
});

router.get('/detail/:id', async (req, res) => {
   var id = req.params.id;
   var toy = await ToyModel.findById(id);
   res.render('toy/detail', { toy: toy });
});

router.get('/delete/:id', async (req, res) => {
   var id = req.params.id;
   await ToyModel.findByIdAndDelete(id);
   console.log('Delete toy succeed');
   res.redirect('/toy');
});

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var toy = await ToyModel.findById(id);
   res.render('toy/edit', { toy: toy })
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var toy = req.body;
   await ToyModel.findByIdAndUpdate(id, toy);
   console.log('Update toy succeed !');
   res.redirect('/toy');
})

router.post('/search', async (req, res) => {
   var keyword = req.body.name;
   var toys = await ToyModel.find({ name: new RegExp(keyword, "i") });
   res.render('toy/index', { toys: toys });
})

router.get('/nameasc', async (req, res) => {
   var toys = await ToyModel.find().sort({ name: 1 });
   res.render('toy/index', { toys: toys });
})

router.get('/namedesc', async (req, res) => {
   var toys = await ToyModel.find().sort({ name: -1 });
   res.render('toy/index', { toys: toys });
})

module.exports = router;
