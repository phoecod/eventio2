import axios from 'axios';
import key from './apiKey';

const uri="https://testproject-api-v2.strv.com/events";
const config = {
    headers: {
        "APIKey": key,
        "Content-Type": "application/json"
    }
}

export const fetchEventsApi = () => {
    return axios.get(uri,config);
}

export const addEventsApi = (event, auth) => {
    config.headers['Authorization'] = auth;
    return axios.post(uri,event, config);
}

export const deleteEventsApi = (eventId, auth) => {
    config.headers['Authorization'] = auth;
    console.log(config);
    return axios.delete(`${uri}/${eventId}`, config);
}