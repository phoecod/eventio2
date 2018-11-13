import axios from 'axios';
import {setError} from './error';
import { setUser, removeUser } from './user';

export const startSignUp = (formProps, callback) => async dispatch => {

    //db call
    try {
        const response = await axios.post('https://eventioserver.herokuapp/signup', formProps);
        const jwt = response.data.token;
        const resUser = response.data.user;
        dispatch(setAuthToken(jwt));
        dispatch(setUser(resUser));
        localStorage.setItem("token", jwt);
        localStorage.setItem("user", JSON.stringify(resUser));
        callback();
    } catch(e) {
        console.log(e.response.data);
        dispatch(setError(e.response.data.error));
    }
}

export const startSignIn = (formProps, callback) => async dispatch => {
    //db call
    try {
        const response = await axios.post('https://eventioserver.herokuapp/signin', formProps);
        const jwt = response.data.token;
        const resUser = response.data.user;
        dispatch(setAuthToken(jwt));
        dispatch(setUser(resUser));
        localStorage.setItem("token", jwt);
        localStorage.setItem("user", JSON.stringify(resUser));
        callback();
    } catch(e) {
        console.log(e);
       return {authErr: 'This password/username combination is invalid!'};
    }
}

export const setAuthToken = (token) => ({
    type: 'SET_AUTH',
    auth: token
});

export const startSignOut = (dispatch) => {
    
    localStorage.removeItem('token');    
    localStorage.removeItem('user');
    dispatch(removeUser());
    dispatch(signOut());
}


export const signOut = () => ({
    type: 'REMOVE_AUTH'
});

