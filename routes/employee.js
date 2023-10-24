var express = require('express');
var router = express.Router();

const EmployeeModel = require('../model/EmployeeModel');

// URL : localhost:3001/employee
router.get('/', async (req, res) => {
   // SQL : SELECT * FROM employee
   var employees = await EmployeeModel.find();
   //res.send(employees);
   // render ra file view : views/employee/index.hbs và gửi kèm data thông qua biến 'employees'
   res.render('employee/index', { employees: employees });
})

router.get('/detail/:id', async (req, res) => {
   try {
       // Get the id from the request parameters
       var id = req.params.id;

       // Fetch the employee data from your database
       // Replace EmployeeModel with your actual Mongoose model
       var employee = await EmployeeModel.findById(id);

       // Render the detail view with the employee data
       // Replace 'employee/detail' with your actual detail view path
       res.render('employee/detail', { employee: employee });
   } catch (err) {
       console.error(err);
       res.status(500).send("An error occurred while fetching employee details.");
   }
});

router.get('/delete/:id', async (req, res) => {
   var id = req.params.id;
   await EmployeeModel.findByIdAndDelete(id);
   console.log('Delete employee succeed');
   res.redirect('/employee');
})

router.get('/add', (req, res) => {
   res.render('employee/add');
})

router.post('/add', async (req, res) => {
   var employee = req.body;
   await EmployeeModel.create(employee);
   console.log('Add employee succeed !');
   res.redirect('/employee');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var employee = await EmployeeModel.findById(id);
   res.render('employee/edit', { employee: employee })
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var employee = req.body;
   await EmployeeModel.findByIdAndUpdate(id, employee);
   console.log('Update employee succeed !');
   res.redirect('/employee');
})

router.post('/search', async (req, res) => {
   var keyword = req.body.name;
   //relative search
   var employees = await EmployeeModel.find({ name: new RegExp(keyword, "i") });
   res.render('employee/index', { employees: employees });
})

router.get('/nameasc', async (req, res) => {
   //1: ascending,  -1: descending
   var employees = await EmployeeModel.find().sort({ name: 1 });
   res.render('employee/index', { employees: employees });
})

router.get('/namedesc', async (req, res) => {
   var employees = await EmployeeModel.find().sort({ name: -1 });
   res.render('employee/index', { employees: employees });
})

module.exports = router;