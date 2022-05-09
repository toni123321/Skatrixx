import { loggedUser, getBaseUrl } from './api_client';
import http from "./api_client"

const axios = require('axios');
<<<<<<< HEAD:frontend-files/src/services/userService.js
<<<<<<< HEAD:frontend-files/skatrixx-app/src/services/user.js
const url = "http://localhost:3001";
=======
const url = "https://localhost:3000/";
>>>>>>> 656726ee4f07c2d7578d271697cb4b07db261c78:frontend-files/skatrixx-app/src/services/user.js
//const url = "https://skatrixx.herokuapp.com/";
=======
const url = getBaseUrl
>>>>>>> main:frontend-files/src/services/userService.js

const profile = {
    "id" : 1,
    "username" : "Pedro Dimitrov",
    "levelProg" : {
        "level" : 12,
        "progressToNexLvl" : 33 
    },
    "rankings" : {
        "frRank" : 2,
        "conRank" : 46,
        "wrRank" : 4023
    },
    "image" : "./images/profile-picture.png"
}

export const getProfileLevel = () => {
    return profile.levelProg;
}

export const getProfileRanking = () => {
    return profile.rankings;
}

export const getProfileAchievements = () => {
    return [];
} 

export const getFriends = () => {
    return profile.friends;
}

export const getUser = async (id) => {
    try {
        const resp = await axios.get(url + 'users/' + id);
        return resp.data;
    }
    catch(err) {console.log(err)}
}

export const getUserConnections = async () => {
    try {
        const resp = await axios.get(url + 'connections/' + loggedUser)
        return resp.data;
    }
    catch(err) {console.log(err)}
}

export const searchUserByUsername = async (input) => {
    try {
        const resp = await axios.get(url + 'users/search/' + input)
        return resp.data
    }
    catch(err) {console.log(err)}
}


// level system


const levelUp = (userId, attemptTrickData) => {
    return http.patch(`/users/levelUp/${userId}`, attemptTrickData);
}

export default {
    levelUp
}
