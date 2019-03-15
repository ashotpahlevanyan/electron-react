import {
	FETCH_DEVICES, FETCH_DEVICES_SUCCESS, FETCH_DEVICES_FAILURE, RESET_DEVICES,
	CONNECT_DEVICE, CONNECT_DEVICE_SUCCESS, CONNECT_DEVICE_FAILURE,
	DISCONNECT_DEVICE, DISCONNECT_DEVICE_SUCCESS, DISCONNECT_DEVICE_FAILURE,
	READ_DEVICE_DATA, READ_DEVICE_DATA_SUCCESS, READ_DEVICE_DATA_FAILURE,
	WRITE_DEVICE_DATA, WRITE_DEVICE_DATA_SUCCESS, WRITE_DEVICE_DATA_FAILURE
} from '../actions/bluetooth';

const INITIAL_STATE = {
	devicesList: {devices: [], error: null, loading: false},
	connection: { connection: null, activeDevice: null, lastDevice: null, error: null, loading: false},
	readData: {data: null, error: null, loading: false},
	writeData: {data: null, error: null, loading: false},
};

//	activeDevice: {device: null, connection: null, error: null, loading: false},
// 	lastDevice: {device: null, error: null, loading: false},
export default function(state = INITIAL_STATE, action) {
	let error;
	switch(action.type) {
		case FETCH_DEVICES:
			return { ...state, devicesList: {devices: [], error: null, loading: true} };
		case FETCH_DEVICES_SUCCESS:
			return { ...state, devicesList: {devices: action.payload, error: null, loading: false} };
		case FETCH_DEVICES_FAILURE:
			error = action.payload || {message: action.payload.message};
			return { ...state, devicesList: {devices: [], error: error, loading: false} };
		case RESET_DEVICES:
			return { ...state, devicesList: {devices: [], error: null, loading: false} };

		case CONNECT_DEVICE:
			return { ...state, connection: { connection: null, activeDevice: action.payload, lastDevice: {...state.connection.lastDevice}, error: null, loading: true } };
		case CONNECT_DEVICE_SUCCESS:
			return { ...state, connection: { connection: action.payload, activeDevice: {...state.connection.activeDevice}, lastDevice: {...state.connection.lastDevice}, error: null, loading: false } };
		case CONNECT_DEVICE_FAILURE:
			error = action.payload || { message: action.payload.message };
			return { ...state, connection: { connection: null, activeDevice: null, lastDevice: {...state.connection.lastDevice}, error: error, loading: false } };
		case DISCONNECT_DEVICE:
			return { ...state, connection: { connection: action.payload, activeDevice: {...state.connection.activeDevice}, lastDevice: {...state.connection.lastDevice}, error: null, loading: true } };
		case DISCONNECT_DEVICE_SUCCESS:
			return { ...state, connection: { connection: null, activeDevice: null, lastDevice: {...state.connection.activeDevice}, error: null, loading: false } };
		case DISCONNECT_DEVICE_FAILURE:
			error = action.payload || {message: action.payload.message};
			return { ...state, connection: { connection: {...state.connection.connection}, activeDevice: {...state.connection.activeDevice}, lastDevice: {...state.connection.lastDevice}, error: error, loading: false } };

		case READ_DEVICE_DATA:
			return {...state, readData: {data: null, error: null, loading: true} };
		case READ_DEVICE_DATA_SUCCESS:
			return {...state, readData: {data: action.payload, error: null, loading: false} };
		case READ_DEVICE_DATA_FAILURE:
			error = action.payload || {message: action.payload.message};
			return {...state, readData: {data: null, error: error, loading: false} };

		case WRITE_DEVICE_DATA:
			return {...state, writeData: {data: action.payload, error: null, loading: true} };
		case WRITE_DEVICE_DATA_SUCCESS:
			return {...state, writeData: {data: null, error: null, loading: false} };
		case WRITE_DEVICE_DATA_FAILURE:
			error = action.payload || {message: action.payload.message};
			return {...state, writeData: {data: null, error: error, loading: false} };

		default:
			return state;
	}
}
