const express=require('express')
const router=express.Router()
const User=require('../models/user')



async function getUser(req, res, next){
    let user
  try{
    user=await User.findById(req.params.id)
   if(user == null){
       return res.status(404).json({message: 'Cannot find user'})
   }
  }
  catch(err){
     return res.status(500).json({message: err.message})
  }

  res.user=user
  next()
}


//Get all users
router.get('/', async(req,res)=>{
    try{
        const users=await User.find()
        res.send(users)
    }catch(err){
        res.status(500).json({message: err.message})
    }
 })

 //get one user by id
 router.get('/:id', getUser, (req,res)=>{
    res.send(res.user.username)
 })

 //Post user
 router.post('/',async(req,res)=>{
    const user=new User({
        username:req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    try{
      const newUser=await user.save()
      res.status(201).json(newUser)
    }catch(err){
      res.status(400).json({message: err.message})
    }
})

//Update user
router.patch('/:id', getUser, async(req,res)=>{
    if(req.body.username !=null){
        res.user.username=req.body.username
    }
    if(req.body.password!= null){
        res.user.password=req.body.password
    }
    try{
        const updatedUser=await res.user.save()
        res.json(updatedUser)
    }catch(err){
         res.status(400).json({message: err.message})
    }
})


//Delete user
router.delete('/:id', getUser, async (req,res)=>{
    try{
        await res.user.remove()
        res.json({message: 'Deleted user'})
    }
    catch (err){
        res.status(500).json({message :err.message})
    }
   
})








module.exports=router