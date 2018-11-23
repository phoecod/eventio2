import axios from 'axios';
import {refreshTokenAuth} from './authAPI';
import store from '../store/configureStore';
import {setAuthToken} from '../actions/auth';
import {setUser} from '../actions/user';
import {saveState} from '../store/localStorage';

export default {
    setupIntercept: () => {
        axios.interceptors.response.use( (response) => {
            // Do something with response data
            console.log("Interceptor!")
            console.log(response); 
            return response;
        }, (error) => {
            console.log("interceptor ERRORR!");
            console.log(error);
            // Do something with response error
            if(error.response.status === 401) { 
                console.log("interceptor ERRORR!");
                const refreshToken = localStorage.getItem('refreshToken');
                refreshTokenAuth({refreshToken}).then((res) => {
                    console.log(res);
                    const token = res.headers.authorization;
                    const user = res.data;
                    store.dispatch(setAuthToken(token));
                    store.dispatch(setUser(user));
                });
            }
            // Trow errr again (may be need for some other catch)
            return Promise.reject(error);
        });
    }
}