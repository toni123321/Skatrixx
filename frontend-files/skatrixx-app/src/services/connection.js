import { loggedUser } from './api_client';

const axios = require('axios');
export const url = "https://localhost:3000/";
//export const url = "https://skatrixx.herokuapp.com/";

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