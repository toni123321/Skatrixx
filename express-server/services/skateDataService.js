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
    const result = calcStatResult(max_height, max_airtime, avg_rotationY, avg_rotationZ)

    const skatePerformance = {
        max_height: max_height,
        max_airtime: max_airtime,
        avg_rotationY: avg_rotationY,
        avg_rotationZ: avg_rotationZ,
        result: result,
        result_gif: getResultGif(result)
    }
    return skatePerformance
}


function calcRotationY(rotationY_arr){
    return (rotationY_arr.reduce((a, b) => a+b) / rotationY_arr.length).toFixed(1)
}

function calcRotationZ(rotationZ_arr) {
    return (rotationZ_arr.reduce((a, b) => a+b) / rotationZ_arr.length).toFixed(1)
}

function calcMaxHeight(height_arr) {
    return Math.max(...height_arr).toFixed(1)
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
    let result = "try_again"

    if(max_height >= 20) {
        result = "incredible"
    }
    else if(max_height >= 10){
        result = "good"
    }
    return result;
}

function getResultGif(result) {
    let result_gif = ""
    switch(result) {
        case 'try_again':
            result_gif = "https://firebasestorage.googleapis.com/v0/b/skatrixx2-3f452.appspot.com/o/skatePerformanceGifs%2Ftry_again_performance.gif?alt=media&token=e62ae626-bbea-481c-bfe5-567a281a09ab"
            break
        case 'good':
            result_gif = "https://firebasestorage.googleapis.com/v0/b/skatrixx2-3f452.appspot.com/o/skatePerformanceGifs%2Fgood-performance.gif?alt=media&token=18eb0be5-a57a-4ed2-bf02-2ac2d3cc4961"
            break
        case 'incredible':
            result_gif = "https://firebasestorage.googleapis.com/v0/b/skatrixx2-3f452.appspot.com/o/skatePerformanceGifs%2Fincredible-performance.gif?alt=media&token=c5463f16-fc8c-4f9e-96fe-b714066206fb"
            break
        default:
            result_gif = "https://firebasestorage.googleapis.com/v0/b/skatrixx2-3f452.appspot.com/o/skatePerformanceGifs%2Ftry_again_performance.gif?alt=media&token=e62ae626-bbea-481c-bfe5-567a281a09ab"
            break
    }
    return result_gif
}

module.exports = {
    getLastPerformance
}