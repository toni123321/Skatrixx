const axios = require('axios');
export const loggedUser = "622f56c05648481f811105cf"
const url = "http://localhost:3000/";
//const url = "https://skatrixx.herokuapp.com/";

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

export const sendFriendRequestByUsername = (username) => {

    var data = {
        username : username,
        sender_id : loggedUser
    }

    var config = {
        method : 'POST',
        url : url + 'connections/username',
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    }

    axios(config)
        .then(function (response) {
            if(response.status === 201) {
                return (response.data)
            }
            return null;
        })
        .catch(function (error) {return null;})
}

export const sendFriendRequestQR = (id) => {
    var data = {
        "sender_id" : loggedUser,
        "reciever_id" : id
    }

    var config = {
        method : 'POST',
        url : url + 'connections/qr',
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    }

    axios(config)
        .then(function (response) {
            if(response.status === 201) {
                return (response.data)
            }
            return null;
        })
        .catch(function (error) {console.log(error)})
}

export const cancelFriendRequest = async (request) => {
    try {
        const resp = await axios.delete(url + 'connections/' + request)
        return resp.data
    }
    catch(err) {console.log(err); return null;}
} 

export const acceptFriendRequest = async (request) => {
    var data = {
        isAccepted : true
    }
    var config = {
        method : 'PUT',
        url : url + 'connections/' + request,
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    }

    axios(config)
    .then(function (response) {
        if(response.status === 200) {
            return (response.data)
        }
        return null;
    })
    .catch(function (error) {console.log(error)})
}  

export const getProfileName = () => {
    return profile.username;
}

export const getProfileImage = () => {
    return profile.image;
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
