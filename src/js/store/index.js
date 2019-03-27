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
	'IPC_FETCH_PAIRED_DEVICES_SUCCESS' : (event, args) => dispatch => {
		dispatch({
			type: 'FETCH_PAIRED_DEVICES_SUCCESS',
			payload: args.devices
		});
	},
	'IPC_FETCH_PAIRED_DEVICES_FAILURE' : (event, args) => dispatch => {
		dispatch({
			type: 'FETCH_PAIRED_DEVICES_FAILURE',
			payload: args.error
		});
	},
	'IPC_SCAN_ACTIVE_DEVICES_SUCCESS' : (event, args) => dispatch => {
		dispatch({
			type: 'SCAN_ACTIVE_DEVICES_SUCCESS',
			payload: args.devices
		});
	},
	'IPC_SCAN_ACTIVE_DEVICES_FAILURE' : (event, args) => dispatch => {
		dispatch({
			type: 'SCAN_ACTIVE_DEVICES_FAILURE',
			payload: args.error
		});
	},
	'IPC_CONNECT_TO_DEVICE': (event, args) => dispatch => {
		dispatch({
			type: 'CONNECT_TO_DEVICE',
			payload: args.device
		});
	},
	'IPC_CONNECT_TO_DEVICE_SUCCESS': (event, args) => dispatch => {
		dispatch({
			type: 'CONNECT_TO_DEVICE_SUCCESS',
			payload: args.connection
		});
	},
	'IPC_FIND_SERIAL_PORT_CHANNEL_SUCCESS': (event, args) => dispatch => {
		dispatch({
			type: 'FIND_SERIAL_PORT_CHANNEL_SUCCESS',
			payload: args.connection
		});
	},
	'IPC_CONNECT_TO_DEVICE_FAILURE': (event, args) => dispatch => {
		dispatch({
			type: 'CONNECT_TO_DEVICE_FAILURE',
			payload: args.error
		});
	},
	'IPC_READ_DATA_FROM_DEVICE_SUCCESS': (event, args) => dispatch => {
		dispatch({
			type: 'READ_DATA_FROM_DEVICE_SUCCESS',
			payload: args.data
		});
	},
	'IPC_READ_DATA_FROM_DEVICE_FAILURE': (event, args) => dispatch => {
		dispatch({
			type: 'READ_DATA_FROM_DEVICE_FAILURE',
			payload: args.data
		});
	},
	'IPC_DISCONNECT_FROM_DEVICE_SUCCESS': (event, args) => dispatch => {
		dispatch({
			type: 'DISCONNECT_FROM_DEVICE_SUCCESS',
			payload: args
		});
	},
	'IPC_DISCONNECT_FROM_DEVICE_FAILURE': (event, args) => dispatch => {
		dispatch({
			type: 'DISCONNECT_FROM_DEVICE_FAILURE',
			payload: args
		});
	},
});

const middleware = [thunk, ipc, routerMiddleware(history), loggerMiddleware];

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;