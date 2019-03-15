import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import { fetchDevices } from '../actions/bluetooth';
import createIpc from 'redux-electron-ipc';

export const history = createHistory();

const loggerMiddleware = createLogger();

const ipc = createIpc({
	'IPC_LIST_PAIRED_DEVICES_SUCCESS' : (event, args) => dispatch => {
		dispatch({
			type: 'FETCH_DEVICES_SUCCESS',
			payload: args.devices
		});
	},
	'IPC_LIST_PAIRED_DEVICES_FAILURE' : (event, args) => dispatch => {
		dispatch({
			type: 'FETCH_DEVICES_FAILURE',
			payload: args.error
		});
	},
	'IPC_CONNECT_DEVICE_SUCCESS': (event, args) => dispatch => {
		dispatch({
			type: 'CONNECT_DEVICE_SUCCESS',
			payload: args.connection
		});
	},
	'IPC_CONNECT_DEVICE_FAILURE': (event, args) => dispatch => {
		dispatch({
			type: 'CONNECT_DEVICE_FAILURE',
			payload: args.error
		});
	},
	'IPC_READ_DEVICE_DATA_SUCCESS': (event, args) => dispatch => {
		dispatch({
			type: 'READ_DEVICE_FAILURE',
			payload: args.data
		});
	},
	'IPC_READ_DEVICE_DATA_FAILURE': (event, args) => dispatch => {
		dispatch({
			type: 'READ_DEVICE_FAILURE',
			payload: args.data
		});
	},
});

const middleware = [thunk, ipc, routerMiddleware(history), loggerMiddleware];

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;