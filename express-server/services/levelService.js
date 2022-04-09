const trickModel = require("../models/trick");

// Level up + increase xp
async function levelUp(user, trickId, trickStat) {
    if(trickStat >= 75){
        try {
            // Find the trick by trickId
            const trick = await trickModel.findById(trickId) 
            user.xp += trick.xp
        }
        catch(err) {
            return res.status(404).json({message: 'Cannot find the trick!'})
        }   
    }
    return user
}


// TODO: check how to improve the trick of the user and to return some description
function checkForLevelUp(){
    
}


module.exports = {
    levelUp
}