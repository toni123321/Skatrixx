const mongoose = require('mongoose')

const skateGameSchema = new mongoose.Schema({
    players : {
        type: Array,
        required: true
    },
    eliminated : {
        type: Array,
        required: true
    },
    scores: {
        type: Array,
        required: true
    },
    currentTrick: {
        type: String,
        reqired: false
    },
    trickPicker: {
        type: Number,
        required: true
    },
    currentPlayer: {
        type: Number,
        required: true
    },
    round: {
        type: Number,
        required: true
    },
    voting: {
        type: Boolean,
        required: true
    },
    votes: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('SkateGame', skateGameSchema)