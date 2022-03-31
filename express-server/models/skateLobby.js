const mongoose = require('mongoose')

const skateLobbySchema = new mongoose.Schema({
    accessCode : {
        type: String,
        required: true
    },
    isPrivate : {
        type: Boolean,
        required: true
    },
    members : {
        type: Array,
        required: true
    },
    invitations : {
        type: Array,
        required: true
    },
    limit : {
        type: Number,
        required:  true
    }
})

module.exports = mongoose.model('SkateLobby', skateLobbySchema)