const mongoose = require('mongoose')

const consistencySchema = new mongoose.Schema({

     user_id:{
        type: String,
        required:true
     },
     loginDate:{
         type: Array(),
         required: false
     }

})

module.exports=mongoose.model('Consistency', consistencySchema)