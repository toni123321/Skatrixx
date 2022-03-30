const trick = require("../models/trick");

function levelUp(input) {
    let sum = 0
    let tricks = trick.find();
    for (let i = 0; i <= tricks.length; i++) {
        let current = tricks[i]  
        if(current === tricks.name) {sum += tricks.xp}
            console.log("Congrats")
        }
    console.log(sum)
}

levelUp(["Ollie", "Ollie", "Kickflip"])