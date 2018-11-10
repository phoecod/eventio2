import {DEFAULT_STATE} from '../store/configureStore';

const userIdReducer = (state=DEFAULT_STATE.user, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.user;
        case 'REMOVE_USER':
            return null;
        default:
            return state;
    } 
}

export default userIdReducer;