import { loggedUser } from './api_client';

const axios = require('axios');
const url = "http://localhost:3000/";
//const url = "https://skatrixx.herokuapp.com/";

export const createLobby = async () => {
    var data = {
        isPrivate : true,
        members : loggedUser,
        limit : 2
    }

    var config = {
        method : 'POST',
        url : url + '/lobbies',
        headers : {
            'Content-Type': 'application/json'
        },
        data : data
    }

    axios(config)
        .then(function (response) {
            if(response.status === 200) {
                return (response.data)
            }
        })
        .catch(function (error) {return null})
}

export const joinLobby = (code) => {
    var data = {
        user_id : loggedUser
    }

    var config = {
        method : 'PATCH',
        url : url + '/lobbies/join/' + code ,
        headers : {
            'Content-Type': 'application/json'
        },
        data : data
    }

    axios(config)
        .then(function (response) {
            if(response.status) {

            }
        })
        .catch(function (error) {console.log(error)})
}   

export const getLobbies = async () => {
    try {
        const resp = await axios.get(url + 'lobbies/public')
        return resp.data
    }
    catch(err) {console.log(err)}
}