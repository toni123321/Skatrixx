const express=require('express')
const router=express.Router()
const User=require('../models/user')
const levelService = require('../services/levelService')
const Consistency = require('../models/consistency')

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



async function getUserByUsername(req, res, next) {
    let users
    try {
        users = await User.find({username : {"$regex" : req.params.username, "$options" : "i"}})
        // if(users.length == 0){
        //     return res.status(404).json({message: 'Cannot find users'})
        // }
    }
    catch(err) {
        res.status(500).json({message : err.message})
    }
    res.users = users
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
    res.send(res.user)
 })

 // Search User by username
router.get('/search/:username', getUserByUsername, (req, res) => {
//    if(res.users==null){
//        return res.status(400).json({message: 'Cannot find users'})
//    }
        res.send(res.users)

    
})

 //Post user
 router.post('/',async(req,res)=>{
    const user=new User({
        username:req.body.username,
        email: req.body.email,
        password: req.body.password,
        image : req.body.image,
        level : req.body.level,
        xp : req.body.xp
    })

    try{
      const newUser=await user.save()

      const consistency = new Consistency({
        user_id: user.id
    })
    await consistency.save()

      res.status(201).json(newUser)
    }catch(err){
      res.status(400).json({message: err.message})
    }
})

//Update user
router.patch('/:id', getUser, async(req,res)=>{
    console.log(req.body)
    if(req.body.username !=null){
        res.user.username=req.body.username
    }
    if(req.body.password!= null){
        res.user.password=req.body.password
    }
    if(req.body.xp!= null){
        res.user.xp= req.body.xp
    }
    try{
        const updatedUser=await res.user.save()
        res.json(updatedUser)
    }catch(err){
         res.status(400).json({message: err.message})
    }
})

// User levelUp using path request
router.patch('/levelUp/:id', getUser, async(req,res)=>{
    // check if req.body parameters(trickId, trickStat) have values)
    try{
        if(req.body.trickId !=null && req.body.trickStat!= null){
            // wait to get the updated user
            const user = await levelService.levelUp(res.user, req.body.trickId, req.body.trickStat )
            res.user.xp = user.xp
        }
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

module.exports = router