import {createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import errorReducer from '../reducers/error';
import userIdReducer from '../reducers/user';
import eventReducer from '../reducers/event';
import {loadState, saveState} from './localStorage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadState();
export const DEFAULT_STATE = {
	auth: persistedState,
	user: JSON.parse(localStorage.getItem('user')),
	errors: null,
	events: []
}


const store =  createStore (
	combineReducers ({
		auth: authReducer,
		user: userIdReducer,
		errors: errorReducer,
		events: eventReducer
	}),
	composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
    saveState({
      auth: store.getState().auth
    });
});

export default store;