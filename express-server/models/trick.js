const mongoose = require('mongoose')

const trickSchema = new mongoose.Schema({
    name:{
       type: String,
       required:true
    },
    xp:{
        type: Number,
        required:true
    },
    videoLink:{
        type: String,
        required:true
    },
    difficulty:{
        type: String,
        required: true
    }
})


module.exports=mongoose.model('Trick', trickSchema)