const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
        trim : true
    },

    description : {
        type : String,
        required : true,
        trim : true
    },

    price : {
        type : Number,
        required : true,
        min : 0
    },

    category : {
        type : String,
        required : true,
        enum : ["PC Gamers", "Smartphones", "Accessories"]
    },

    stock : {
        type : Number,
        required : true,
        min : 0,
    },

    image : {
        type : String,
        required : true,
    },

    brand : {
        type : String,
        default : "Unknown"
    },

    rating : {
        type : Number,
        default : 0,
        min : 0,
        max : 5
    },

    salePrice : {
        type : Number,
        default : null
    },

    isNew : {
        type : Boolean,
        default : false
    },

    isFeatured : {
        type : Boolean,
        default : false
    }
},
{ timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;