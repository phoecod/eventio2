import {DEFAULT_STATE} from '../store/configureStore';

const errorReducer = (state=DEFAULT_STATE.errorMsg, action) => {
    switch (action.type) {
        case 'SET_ERROR':
            return action.error;
        case 'REMOVE_ERROR':
            return DEFAULT_STATE.errorMsg;
        default:
            return state;
    } 
}

export default errorReducer;