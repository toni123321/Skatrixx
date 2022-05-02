const mongoose = require('mongoose')

const moduleStateSchema = new mongoose.Schema({
    isStarted : {
        type : Boolean
    }
})

module.exports = mongoose.model('moduleState', moduleStateSchema)