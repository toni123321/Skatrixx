const express = require('express')
const router = express.Router()
const SkateLobby = require('../models/skateLobby')
const { createCode } = require('../services/skateLobbyService')

async function getSkateLobby(req, res, next) {
    let skateLobby
    try {
        skateLobby = await SkateLobby.findById(req.params.id)
        if(skateLobby == null) {
            return res.status(404).json({message : "Cannot find lobby"})
        }
    }
    catch(err) {
        return res.status(500).json({message : err.message})
    }
    res.skateLobby = skateLobby
    next()
}

async function getLobbyByUser(req, res, next) {
    let skateLobby
    try {
        skateLobby = await SkateLobby.findOne({members : req.body.members[0]})
    }
    catch(err) {
        return res.status(500).json({message : err.message})
    }
    res.skateLobby = skateLobby
    next()
}

async function getPublicSkateLobby(req, res, next) {
    let skateLobby
    try {
        skateLobby = await SkateLobby.find({isPrivate : false})
        if(skateLobby == null) {
            return res.status(404).json({message : "Cannot find lobby"})
        }
    }
    catch(err) {
        return res.status(500).json({message : err.message})
    }
    res.skateLobby = skateLobby
    next()
}

async function getLobbyByCode(req, res, next) {
    let skateLobby
    try {
        skateLobby = await SkateLobby.findOne({accessCode : req.params.code})
        if(skateLobby == null) {
            return res.status(404).json({message : "Cannot find lobby"})
        }
    }
    catch(err) {return res.status(500).json({message : err.message})}
    res.skateLobby = skateLobby
    next()
}

router.get('/', async(req, res) => {
    try {
        const lobbies = await SkateLobby.find();
        res.send(lobbies)
    }
    catch(err) {
        res.status(500).json({message : err.message})
    }
})

router.get('/public', getPublicSkateLobby, (req, res) => {
    try {
        res.send(res.skateLobby)
    }
    catch(err) {
        res.status(500).json({message : err.message})
    }
})

router.get('/:id', getSkateLobby, (req, res) => {
    try {
        res.send(res.SkateLobby);
    }
    catch(err) {
        res.status(500).json({message : err.message})
    }
})

router.post('/', getLobbyByUser, async(req, res) => {
    if(res.skateLobby == null) {
    const skateLobby = new SkateLobby({
        accessCode : createCode(),
        isPrivate : req.body.isPrivate,
        members : req.body.members,
        limit:  req.body.limit
    })
    try {
        const newSkateLobby = await skateLobby.save()
        res.status(201).json(newSkateLobby)
    }
    catch(err) {
        res.status(400).json({message : err.message})
    }
}
    else {
        const newSkateLobby = res.skateLobby
        res.status(200).json(newSkateLobby)
    }
})

router.patch('/join/:code', getLobbyByCode,async(req, res) => {
    const io = req.app.get('socketio')
    if(req.body.members !== null && Object.keys(res.skateLobby.members).length < res.skateLobby.limit) {
        res.skateLobby.members.push(req.body.user_id)
        try{
            const updatedLobby = await res.skateLobby.save()
            io.emit(updatedLobby._id, updatedLobby)
            res.json(updatedLobby)
        }
        catch(err) {
            res.status(400).json({message : err.message})
        }
    }
    else {res.status(403).json({message : "This lobby is already full"})}
})

router.patch('/:id/join/:userId', getSkateLobby, async(req, res) => {
    const io = req.app.get('socketio')
    if(req.params.userId !== null && Object.keys(res.skateLobby.members).length < res.skateLobby.limit) {
        res.skateLobby.members.push(req.params.userId)
        try{
            const updatedLobby = await res.skateLobby.save()
            io.emit(req.params.id, updatedLobby)
            res.json(updatedLobby)
        }
        catch(err) {
            res.status(400).json({message : err.message})
        }
    }
})

router.patch('/:id/:userId/leave', getSkateLobby, async(req, res) => {
    const io = req.app.get('socketio')
    if(req.params.userId !== null) {
        res.skateLobby.members.pull(req.params.userId)
    }
    try{
        const updatedLobby = await res.skateLobby.save()
        io.emit(req.params.id, updatedLobby)
        res.json(updatedLobby)
    }
    catch(err) {
        res.status(400).json({message : err.message})
    }
})

router.patch('/:id/invite/:userId', getSkateLobby, async(req, res) => {
    const io = req.app.get('socketio')
    if(req.params.userId !== null){
        res.skateLobby.invitations.push(req.params.userId);
    }
    try{
        const updatedLobby = await res.skateLobby.save()
        io.emit(req.params.userId, updatedLobby)
        io.emit(req.params.id, updatedLobby)
        res.json(updatedLobby)
    }
    catch(err) {
        res.status(400).json({message : err.message})
    }
})

router.patch('/:id/deny/:userId', getSkateLobby, async(req, res) => {
    const io = req.app.get('socketio')
    if(req.params.userId !== null){
        res.skateLobby.invitations.pull(req.params.userId);
    }
    try{
        const updatedLobby = await res.skateLobby.save()
        io.emit(req.params.id, updatedLobby)
        res.json(updatedLobby)
    }
    catch(err) {
        res.status(400).json({message : err.message})
    }
})

router.patch('/:id/accept/:userId', getSkateLobby, async(req, res) => {
    const io = req.app.get('socketio')
    if(req.params.userId !== null && Object.keys(res.skateLobby.members).length < res.skateLobby.limit){
        res.skateLobby.invitations.pull(req.params.userId);
        res.skateLobby.members.push(req.params.userId);
    }
    try{
        const updatedLobby = await res.skateLobby.save()
        io.emit(req.params.id, updatedLobby)
        res.json(updatedLobby)
    }
    catch(err) {
        res.status(400).json({message : err.message})
    }
})

router.patch('/:id/:access', getSkateLobby, async(req, res) => {
    const io = req.app.get('socketio')
    if(req.params.access !== null){
        res.skateLobby.isPrivate = req.params.access
    }
    try{
        const updatedLobby = await res.skateLobby.save()
        io.emit(req.params.id, updatedLobby)
        res.json(updatedLobby)
    }
    catch(err) {
        res.status(400).json({message : err.message})
    }
})

router.patch('/:id/limit/:limit', getSkateLobby, async(req, res) => {
    const io = req.app.get('socketio')
    if(req.params.limit !== null){
        res.skateLobby.limit = req.params.limit
    }
    try{
        const updatedLobby = await res.skateLobby.save()
        io.emit(req.params.id, updatedLobby)
        res.json(updatedLobby)
    }
    catch(err) {
        res.status(400).json({message : err.message})
    }
})

router.delete('/:id', getSkateLobby, async(req,res) => {
    try{
        await res.skateLobby.remove()
        res.json({message: 'Deleted lobby'})
    }
    catch (err){
        res.status(500).json({message :err.message})
    }
})

module.exports = router