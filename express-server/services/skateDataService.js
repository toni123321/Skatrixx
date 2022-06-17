const SkatePerformance = require("../models/skatePerformance");

function getLastPerformance(skateData) {
    let startIndex = 0;
    let endIndex = 0;
    for (let i = 0; i < skateData.length; i++) {
     // console.log(`Skate data: ${skateData[i].status}`);
     if(skateData[i].status === "end-stat" && i == 0) {
      startIndex = i;
     }
     if(skateData[i].status === "start-stat" && i != 0) {
      endIndex = i;
      break;
     }
    }

    let skateLatestsStats = []
    for(let i = startIndex; i <= endIndex; i++) {
      skateLatestsStats.push(skateData[i])
    }
    console.log(skateLatestsStats)
    return processSkateData(skateLatestsStats)
}

function processSkateData(skateLatestsStats) {
    height_arr = []
    skateLatestsStats.map((stat) => {
        height_arr.push(parseFloat(stat.height))
    }) 

    rotationY_arr = []
    skateLatestsStats.map((stat) => {
        rotationY_arr.push(parseFloat(stat.rotationY))
    }) 

    rotationZ_arr = []
    skateLatestsStats.map((stat) => {
        rotationZ_arr.push(parseFloat(stat.rotationZ))
    }) 

    const max_height = calcMaxHeight(height_arr)
    const max_airtime = calcAirtime(height_arr)
    const avg_rotationY = calcRotationY(rotationY_arr)
    const avg_rotationZ = calcRotationZ(rotationZ_arr)

    const skatePerformance = {
        max_height: max_height,
        max_airtime: max_airtime,
        avg_rotationY: avg_rotationY,
        avg_rotationZ: avg_rotationZ,
        result: calcStatResult(max_height, max_airtime, avg_rotationY, avg_rotationZ)
    }
    return skatePerformance
}


function calcRotationY(rotationY_arr){
    return rotationY_arr.reduce((a, b) => a+b) / rotationY_arr.length;
}

function calcRotationZ(rotationZ_arr) {
    return rotationZ_arr.reduce((a, b) => a+b) / rotationZ_arr.length;
}

function calcMaxHeight(height_arr) {
    return Math.max(...height_arr)
}

function calcAirtime(height_arr) {
    let biggestAirtime = 0
    let currAirtime = 0

    for (let i=0; i < height_arr.length; i++) {
        if(height_arr[i] > 5) {
            currAirtime++
            if(currAirtime > biggestAirtime) {
                biggestAirtime = currAirtime
            }
        }
    }
    return biggestAirtime
}

function calcStatResult(max_height, max_airtime, avg_rotationY, avg_rotationZ) {
    return "Good";
}

module.exports = {
    getLastPerformance
}