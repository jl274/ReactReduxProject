const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    playingTime: {
        type: Number,
        min: 15,
        max: 300,
        default: 30
    },
    complexity: {
        type: Number,
        min: 1,
        max: 100,
        required: true
    },
    minAge: {
        type: Number,
        min: 5,
        max: 120,
        default: 10
    },
    producer: {
        type: String,
        required: true
    },
    offers: {
        type: [String],
        required: true
    },
    url: {
        type: String
    },
    description: {
        type: String
    }
});

module.exports = model('Game', gameSchema);