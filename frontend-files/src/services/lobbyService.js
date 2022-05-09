import { getBaseUrl } from './api_client';

const axios = require('axios');
const url = getBaseUrl

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

export const joinLobbyButton = async (id, userId) => {
    try {
        const resp = await axios.patch(url + `lobbies/${id}/join/${userId}`)
        return resp.data
    }
    catch (err) {console.log(err)}
}

export const joinLobby = async (code, userId) => {
    var data = {
        user_id : userId
    }

    var config = {
        method : 'PATCH',
        url : url + 'lobbies/join/' + code ,
        headers : {
            'Content-Type': 'application/json'
        },
        data : data
    }
    try{
        const resp = await axios(config)
        if(resp.status === 200) {console.log('yes'); return true}
        else {return false}
    }
    catch(err) {console.log(err)}
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

export const inviteFriend = async (id, userId) => {
    try {
        const resp = await axios.patch(url + 'lobbies/' + id + '/invite/' + userId)
        if(resp.status !== 404) {return resp.data}
        return null
    }
    catch(err) {console.log(err)}
}

export const acceptAndJoinLobby = async (id, userId) => {
    try {
        const resp = await axios.patch(url + 'lobbies/' + id + '/accept/' + userId)
        if(resp.status !== 404) {return resp.data}
        return null
    }
    catch(err) {console.log(err)}
}

export const denyAndLeaveLobby = async (id, userId) => {
    try {
        const resp = await axios.patch(url + 'lobbies/' + id + '/deny/' + userId)
        if(resp.status !== 404) {return resp.data}
        return null
    }
    catch(err) {console.log(err)}
}