const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
       type: String,
       required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    image : {
        type: String,
        required: false
    },
    level : {
        type : String,
        required: true
    },
    xp : {
        type : Number,
        required : true
    }
})


module.exports=mongoose.model('User',userSchema)