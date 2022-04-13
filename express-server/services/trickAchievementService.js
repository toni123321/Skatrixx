const express = require('express')
const MyTricks = require('../models/mytricks')

async function getMyTricks(req, res, next) {
    let mytricks
    //counting them How?
    try{
        mytricks = await MyTricks.find({user_id : req.params.user_id}, {trick_id : req.params.trick_id}, {isSkate : req.params.isSkate})
        if (mytricks == null) {
            return res.status(404).json({message: 'Cannot find my trick!'})
        }
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
    res.mytricks = mytricks
    next() 
}

async function post(req, res, next) {

    let newMyTrick
    let mytrick = new MyTricks({
        user_id: req.params.user_id,
        trick_id: req.params.trick_id,
        isSkate: req.params.isSkate
    })
    try{
        newMyTrick = await MyTricks.post(mytrick)
        res.status(201).json(newMyTrick)
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
    res.mytricks = newMyTrick
    next()
}

async function checkAchievement(req, res, next){
    post(req, res, next)
    getMyTricks(req, res, next)
    
    // check count of elements
    /* if ==10, Badge*10
  else if == 1, Badge*1 */ 
}



module.exports = {
    getMyTricks,
    checkAchievement
}