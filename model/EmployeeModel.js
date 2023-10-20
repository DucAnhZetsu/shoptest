var mongoose = require('mongoose');
var StudentSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, 'Name can not be empty']
      },
      
      age: {
         type: Int32Array,
         min: [0, 'Age can not be negative'],
         max: 99
      },
      gender: {
         type: String,
         enum: ['Male', 'Female']
      },
      email: {
        type: String,
        required: [true, 'email can not be empty']
     },
     
   }
);
var EmployeeModel = mongoose.model('employee', StudentSchema, 'employee');
module.exports = EmployeeModel;