const { Schema, model } = require('mongoose');

const producerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    established: { 
        type: Date, 
        default: Date.now 
    },
    country: {
        type: String
    },
    offers: {
        type: [String],
        required: true
    }
})

module.exports = model('Producer', producerSchema);