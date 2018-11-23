import axios from 'axios';
import key from './apiKey';

const uri = "https://testproject-api-v2.strv.com/auth/native";
const config = {
    headers: {
        "APIKey": key,
        "Content-Type": "application/json"
    }
}

export const emailPasswordAuth = (user) => {
    
    return axios.post(uri, user, config);
}

export const refreshTokenAuth = (refreshToken) => {
    const config = {"APIKey": key}
    console.log(refreshToken);
    return axios.post(uri, config, refreshToken);
}