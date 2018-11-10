import {DEFAULT_STATE} from '../store/configureStore';

const eventReducer = (state=DEFAULT_STATE.events, action) => {
    switch(action.type) {
        case 'SET_EVENTS':
            return action.events;
        case 'ADD_EVENT':
            return state.concat(action.event);
        case 'EDIT_EVENT':     
            return state.map((event) => {
                if (event._id === action.event._id) {
                    return action.event
                } else {
                    return event
                }
            });
        case 'DELETE_EVENT':
            return state.filter((event) => event._id !== action.eventId);
        default:
            return state;
    }
}

export default eventReducer;