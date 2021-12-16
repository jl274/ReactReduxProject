const { Schema, model } = require('mongoose');

const offerSchema = new Schema({
    product: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0.01,
        required: true
    },
    shop: {
        type: String,
        required: true
    },
    link: {
        type: String,
        match: /^.*[.].*$/,
        required: true
    }
})

module.exports = model('Offer', offerSchema);