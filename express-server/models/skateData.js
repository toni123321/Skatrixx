const mongoose=require('mongoose')


const skateData=new mongoose.Schema({
    speed: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    airtime: {
        type: String,
        required: true
    },
    rotation: {
        type: String,
        required: true
    },
    accelX: {
        type: String,
        required: true
    },
    accelY: {
        type: String,
        required: true
    },
    accelZ: {
        type: String,
        required: true
    },
    gyroZ: {
        type: String,
        required: true
    }
})

module.exports=mongoose.model('skateData',skateData)