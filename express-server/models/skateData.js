const mongoose=require('mongoose')


const skateData=new mongoose.Schema({
    speed: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    airtime: {
        type: Number,
        required: true
    },
    rotation: {
        type: Number,
        required: true
    },
    accelX: {
        type: Number,
        required: true
    },
    accelY: {
        type: Number,
        required: true
    },
    accelZ: {
        type: Number,
        required: true
    },
    gyroZ: {
        type: Number,
        required: true
    }
})

module.exports=mongoose.model('skateData',skateData)