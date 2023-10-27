var mongoose = require('mongoose');
var CarSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, 'Name cant be empty']
        },
        type:{ 
            type: String, 
            require: [true, 'type cant be empty']
        },
        age_range: {
            type: String, 
            require: [true, 'type cant be empty']
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
var CarModel = mongoose.model('car', CarSchema, 'car');
module.exports = CarModel;