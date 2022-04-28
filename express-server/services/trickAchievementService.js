const express = require('express')


async function checkAchievement(req, res, next){
    post(req, res, next)
    getMyTricks(req, res, next)
    
    // check count of elements
    /* if ==10, Badge*10
  else if == 1, Badge*1 */ 
}



module.exports = {
    checkAchievement
}