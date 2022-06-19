import { loggedUser, getBaseUrl } from './api_client';

const axios = require('axios');
export const url = getBaseUrl

export const getSkateGame = async (id) => {

    var config = {
        method: 'GET',
        url: url + 'game/' + id,
        headers : {
            'Content-Type': 'application/json'
        }
    }

    try {
        const resp = await axios(config)
        return resp.data 
    } 
    catch (err) { console.log(err) }
}