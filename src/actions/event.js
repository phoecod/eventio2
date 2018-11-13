import axios from 'axios';
import {setError} from './error';
import {appHistory} from '../routers/router';

export const fetchEvents = () => {
    return  dispatch => {
        try {
            return  axios.get('https://eventioserver.herokuapp/events')
            .then((response) => {
                dispatch(setEvent(response.data));
            });
                      
        } catch (e) {
            return e;
        }
    }
}

export const fetchEventsWithDate = (date,futureEvent) => {
    return (dispatch) => {
        try {
            return axios.post('https://eventioserver.herokuapp/events/date',{date, greater: futureEvent})
            .then((event) => {
                dispatch(setEvent(event.data));
            });
        } catch (e) {
            return e;
        }
    }
}

export const startAddEvent = (event) => {
    return (dispatch) => {
        axios.post('https://eventioserver.herokuapp/event', event)
        .then((response) => {
            dispatch(addEvent(response.data));
            appHistory.goBack();
        })
        .catch(function (error) {
            dispatch(setError("Event error"));
        });
    }
}

export const startEditEvent = (event) => {
    return (dispatch) => {
        axios.put('https://eventioserver.herokuapp/event', event)
        .then((response) => {
            const modifiedEvent = response.data;
            dispatch(editEvent(modifiedEvent));
            appHistory.goBack();
        });
    }
}

export const startDeleteEvent = (event) => {
    return (dispatch) => {
        axios.post('http://localhost:3090/event/delete', event)
        .then((response) => {
            dispatch(deleteEvent(response.eventId));
            appHistory.goBack();
        });
    }
}

export const editEventAssociation = (eventId, users, currentUserId) => {
    return (dispatch) => {
        axios.put('http://localhost:3090/user/events', {eventId,users, currentUserId})
        .then((response) => {
            const modifiedEvent = response.data;
            dispatch(editEvent(modifiedEvent));
        });
    }
}

export const addEvent = (event) => ({
    type: 'ADD_EVENT',
    event
});

export const deleteEvent = (eventId) => ({
    type: 'DELETE_EVENT',
    eventId
});

export const editEvent = (event) => ({
    type: 'EDIT_EVENT',
    event
});

export const setEvent = (events) => ({
    type: 'SET_EVENTS',
    events
});