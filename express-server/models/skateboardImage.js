const mongoose = require('mongoose')

const skateboardImageSchema = new mongoose.Schema({
    user_id : {
        type: String,
        required: true
    },
    description : {
        type : String,
        required : false
    },
    dateAdded : {
        type : Date,
        required : true
    },
    image : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('SkateboardImage', skateboardImageSchema)