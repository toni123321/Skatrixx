const mongoose = require('mongoose')

const consistencySchema = new mongoose.Schema({

     user_id:{
        type: String,
        required:true
     },
     loginDate:{
         type: Date,
         required: true
     }

})

module.exports=mongoose.model('Consistency', consistencySchema)