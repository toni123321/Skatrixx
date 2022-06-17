const mongoose = require('mongoose')


const skatePerformance = new mongoose.Schema({
    max_height: {
        type: Number,
        required: true
    },
    max_airtime: {
        type: Number,
        required: true
    },
    avg_rotationY: {
        type: Number,
        required: true
    },
    avg_rotationZ: {
        type: Number,
        required: true
    },
    result: {
        type: String,
        required: true
    }
})

module.exports=mongoose.model('skatePerformance', skatePerformance)