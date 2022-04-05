import { loggedUser } from './api_client';

const axios = require('axios');
const url = "http://localhost:3000/";
//const url = "https://skatrixx.herokuapp.com/";

export const createLobby = async (id) => {
    var data = {
        isPrivate : true,
        members : [id],
        limit : 2
    }

    var config = {
        method : 'POST',
        url : url + 'lobbies',
        headers : {
            'Content-Type': 'application/json'
        },
        data : data
    }

    try {
        const resp = await axios(config)
        return resp.data;
    }
    catch(err) {console.log(err)}

        
        
}

export const getLobbyById = async (id) => {
    try {
        const resp = await axios.get(url + 'lobbies/' + id)
        return resp.data
    }
    catch(err) {console.log(err)}
}

export const joinLobby = (code) => {
    var data = {
        user_id : loggedUser
    }

    var config = {
        method : 'PATCH',
        url : url + 'lobbies/join/' + code ,
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

export const changeLimit = async (lobbyId, limit) => {
    try {
        const resp = await axios.patch(url + 'lobbies/' + lobbyId + '/limit/' + limit)
        return resp.data
    }
    catch(err) {console.log(err)}
}

export const changeVisibility = async (lobbyId, visibility) => {
    try {
        const resp = await axios.patch(url + 'lobbies/' + lobbyId + `/${visibility}`)
        return resp.data
    }
    catch(err) {console.log(err)}
}