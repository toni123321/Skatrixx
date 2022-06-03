const mongoose = require('mongoose')

const skateboardImageSchema = new mongoose.Schema({
    user_id : {
        type: String,
        required: true
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