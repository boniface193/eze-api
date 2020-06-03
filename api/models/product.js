const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productImage: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    spec:{
        type: String,
        required: true
    },
    available:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('product', productSchema);