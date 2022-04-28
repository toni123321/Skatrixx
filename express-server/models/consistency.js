const mongoose = require('mongoose')
const DateTime = require('node-datetime/src/datetime')

const consistencySchema = new mongoose.Schema({

     user_id:{
        type: String,
        required:true
     },

     loginDate: [
        {
        type: Date,
        required: false
        }
    ]

})

module.exports=mongoose.model('Consistency', consistencySchema)