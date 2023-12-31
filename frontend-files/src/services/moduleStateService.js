import { getBaseUrl } from './api_client';

const axios = require('axios');
export const url = getBaseUrl

const startTrick = async () => {
    var config = {
        method : 'PATCH',
        url : url + 'moduleStates/start',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const resp = await axios(config)
        return resp.data;
    }
    catch(err) {console.log(err)}
}

const endTrick = async () => {
    var config = {
        method : 'PATCH',
        url : url + 'moduleStates/finish',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const resp = await axios(config)
        return resp.data;
    }
    catch(err) {console.log(err)}
}

export default {
    startTrick,
    endTrick 
}