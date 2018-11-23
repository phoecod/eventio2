import axios from 'axios';
import {setError} from './error';
import {appHistory} from '../routers/router';
import {fetchEventsApi, addEventsApi, deleteEventsApi} from '../api/eventAPI';

export const fetchEvents = () => {
    return  dispatch => {
        try {
            fetchEventsApi()
            .then((res) => {
                console.log(res.data);
                return dispatch(setEvent(res.data));
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

export const startAddEvent = (event, auth) => {
    return (dispatch) => {
        console.log(event)
        addEventsApi(event, auth)
        .then((response) => {
            console.log(response.data)
            dispatch(addEvent(response.data));
            appHistory.goBack();
        })
        .catch(function (error) {
            console.log(error);
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

export const startDeleteEvent = (eventId, auth) => {
    return (dispatch) => {
        deleteEventsApi(eventId, auth)
        .then((response) => {
            console.log(response);
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