const mongoose=require('mongoose')


const skateData=new mongoose.Schema({
    status: {
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
    rotationY: {
        type: String,
        required: true
    },
    rotationZ: {
        type: String,
        required: true
    }
})

module.exports=mongoose.model('skateData',skateData)