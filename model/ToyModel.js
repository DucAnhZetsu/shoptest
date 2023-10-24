var mongoose = require('mongoose');
var ToySchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, 'Name can not be empty']
      },
      
      type: {
         type: String,
         required: [true, 'Type can not be empty']
      },
      
      age_range: {
         type: String,
         required: [true, 'Age range can not be empty']
      },
      
      manufacturer: {
         type: String,
         required: [true, 'Manufacturer can not be empty']
      },
      
      price: {
         type: Number,
         required: [true, 'Price can not be empty'],
         min: [0, 'Price can not be negative']
      },
      
      in_stock: {
         type: Boolean,
         default: true
      },

      image: {
         type: String,
         required: [true, 'Image URL can not be empty']
      }
   }
);

var ToyModel = mongoose.model('toy', ToySchema, 'toy');
module.exports = ToyModel;
