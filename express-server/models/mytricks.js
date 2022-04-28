const mongoose = require('mongoose')

const mytricksSchema = new mongoose.Schema({
     user_id: {
         type: String,
         required: true
     },
     trick_id: {
         type: String,
         required: true
     },
     isSkate:{
         type: Boolean,
         required: true
     }

})

module.exports=mongoose.model('MyTrick', mytricksSchema)