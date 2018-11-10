import {createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import errorReducer from '../reducers/error';
import userIdReducer from '../reducers/user';
import eventReducer from '../reducers/event';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const DEFAULT_STATE = {
	auth: localStorage.getItem('token'),
	user: JSON.parse(localStorage.getItem('user')),
	errorMsg: null,
	events: []
}

export default createStore (
	combineReducers ({
	auth: authReducer,
	user: userIdReducer,
	errorMsg: errorReducer,
	events: eventReducer
	}),
	composeEnhancers(applyMiddleware(thunk))
);