const mongoose = require('mongoose')

const connectionSchema = new mongoose.Schema({
    sender_id: {
        type : String,
        required : true
    },
    reciever_id : {
        type : String,
        required : true
    },
    accepted : {
        type : Boolean,
        required : true
    }
})

module.exports = mongoose.model('Connection', connectionSchema)