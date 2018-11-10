import {DEFAULT_STATE} from '../store/configureStore';

const authReducer = (state=DEFAULT_STATE.auth, action) => {

    switch (action.type) {
        case 'SET_AUTH':
            return action.auth;
        case 'REMOVE_AUTH':
            return null;
        default:
            return state;
    } 
}

export default authReducer;