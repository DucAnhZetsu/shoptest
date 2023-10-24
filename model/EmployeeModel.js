var mongoose = require('mongoose');
var EmployeeSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, 'Name can not be empty']
      },
      
      age: {
         type: Number,
         min: [0, 'Age can not be negative'],
         max: 99
      },
      dob: Date,
      gpa: {
         type: Number,
         min: [0, 'GPA can not be negative'],
         max: 10
      },
      gender: {
         type: String,
         enum: ['Male', 'Female']
      },
      email: {
         type: String,
         required: [true, 'email can not be empty']
      },
      image: {
         type: String,
         required: [true, 'Image URL can not be empty']
      }
   }
);
var EmployeeModel = mongoose.model('employee', EmployeeSchema, 'employee');
module.exports = EmployeeModel;