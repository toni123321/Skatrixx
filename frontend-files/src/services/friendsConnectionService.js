import { loggedUser, getBaseUrl } from './api_client';

const axios = require('axios');
<<<<<<< HEAD:frontend-files/src/services/friendsConnectionService.js
<<<<<<< HEAD:frontend-files/skatrixx-app/src/services/connection.js
export const url = "http://localhost:3001";
=======
export const url = "https://localhost:3000/";
>>>>>>> 656726ee4f07c2d7578d271697cb4b07db261c78:frontend-files/skatrixx-app/src/services/connection.js
//export const url = "https://skatrixx.herokuapp.com/";
=======
export const url = getBaseUrl
>>>>>>> main:frontend-files/src/services/friendsConnectionService.js

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
    console.log(config)
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