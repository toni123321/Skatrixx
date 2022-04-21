const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
       type: String,
       required:false
    },
    email:{
        type: String,
        required:false
    },
    password:{
        type: String,
        required:false
    },
    image : {
        type: String,
        required: false
    },
    level : {
        type : String,
        required: false
    },
    xp : {
        type : Number,
        required : false
    }
})


module.exports=mongoose.model('User',userSchema)