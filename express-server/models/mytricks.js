const mongoose = require('mongoose')

const mytricksSchema = new mongoose.Schema({
     /*username:{
        type: String,
        required:true
     },
     trickName:{
        type: String,
        required:true
     },*/
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