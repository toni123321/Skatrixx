const trick = require("../models/trick");


function levelUp(user, trickId, trickStat) {
    if(trickStat >= 75){
        const trick = trick.find(trick => trick._id === trickId);
        user.xp += trick.xp    
    }
    return user
}
// TODO: check how to improve the trick of the user and to return some description
function checkForLevelUp(){
    
}
module.exports = {
    levelUp
}