const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Connection = require('../models/connection')
const res = require('express/lib/response')


async function getConnection(req, res, next){
    let con
  try{
    con = await Connection.findById(req.params.id)
   if(con == null){
       return res.status(404).json({message: 'Cannot find con'})
   }
  }
  catch(err){
     return res.status(500).json({message: err.message})
  }

  res.con = con
  next()
}

// Check if connection exists
async function checkConnection(id1, id2) {
    let con
    if(id1 === id2) {return false}
    try {
        con = await Connection.find({$or : [{$and : [{sender_id : id1}, {reciever_id : id2}]}, {$and : [{sender_id : id2}, {reciever_id : id1}]}]})
        if(con.length > 0) {
            return false
        }
        return true
    }
    catch(err) {
        return res.status(500).json({message : err.message})
    }
}

//Get user connections
router.get('/:id', async(req,res)=> {
    try {
        let connections1 = await Connection.find({sender_id : req.params.id})
        let connections2 = await Connection.find({reciever_id : req.params.id})
        const connections = connections1.concat(connections2)
        res.send(connections)
    }
    catch(err) {
        res.status(500).json({message: err.message})
    }
 })

  //get one con by id
  router.get('/:id', getConnection, (req,res)=>{
    res.send(res.con)
 })

 //post con
 router.post('/username', async(req, res) => {
    let user = await User.find({username : req.body.username})
    let id = user[0]._id.toString()
    if(await checkConnection(req.body.sender_id, id)) {
        const con = new Connection({
            sender_id : req.body.sender_id,
            reciever_id : id,
            accepted : false
        })
        try {
            const newConnection = await con.save();
            res.status(201).json(newConnection)
        }
        catch(err) {
            res.status(400).json({mnessage : err.message})
        }
    }
    else {
        res.status(400).json("Request already sent")
    }
 })

  //post con
  router.post('/qr', async(req, res) => {
      if(await checkConnection(req.body.sender_id, req.body.reciever_id)) {
        const con = new Connection({
            sender_id : req.body.sender_id,
            reciever_id : req.body.reciever_id,
            accepted : true
        })
        try {
            const newConnection = await con.save();
            res.status(201).json(newConnection)
        }
        catch(err) {
            res.status(400).json({mnessage : err.message})
        }
      }
 })

 router.put('/:id', getConnection, async(req, res) => {
     if(req.body.isAccepted != null) {
        res.con.accepted = req.body.isAccepted
     }
     try {
         const updatedConnection = await res.con.save()
         res.status(200).json(updatedConnection)
     }
     catch(err) {
         res.status(400).json({message : err.message})
     }
 })

 router.delete('/:id', getConnection, async(req, res) => {
     try {
         await res.con.remove()
         res.status(200).json({message : "Deleted connection"})
     }
     catch(err) {
         res.status(500).json({message : err.message})
     }
 })
 
module.exports=router