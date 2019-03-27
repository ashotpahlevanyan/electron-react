import {
	FETCH_PAIRED_DEVICES, FETCH_PAIRED_DEVICES_SUCCESS, FETCH_PAIRED_DEVICES_FAILURE, RESET_PAIRED_DEVICES,
	SCAN_ACTIVE_DEVICES, SCAN_ACTIVE_DEVICES_SUCCESS, SCAN_ACTIVE_DEVICES_FAILURE, RESET_ACTIVE_DEVICES,
	CONNECT_TO_DEVICE, CONNECT_TO_DEVICE_SUCCESS, CONNECT_TO_DEVICE_FAILURE, FIND_SERIAL_PORT_CHANNEL_SUCCESS,
	DISCONNECT_FROM_DEVICE, DISCONNECT_FROM_DEVICE_SUCCESS, DISCONNECT_FROM_DEVICE_FAILURE,
	READ_DATA_FROM_DEVICE, READ_DATA_FROM_DEVICE_SUCCESS, READ_DATA_FROM_DEVICE_FAILURE,
	WRITE_DATA_TO_DEVICE, WRITE_DATA_TO_DEVICE_SUCCESS, WRITE_DATA_TO_DEVICE_FAILURE
} from '../actions/bluetooth';

const INITIAL_STATE = {
	pairedDevicesList: {devices: [], error: null, loading: false},
	activeDevicesList: {devices: [], error: null, loading: false},
	connection: { status: false, channel: null, connection: null, activeDevice: null, lastDevice: null, error: null, loading: false},
	readData: {data: null, error: null, loading: false},
	writeData: {data: null, error: null, loading: false},
};

//	activeDevice: {device: null, connection: null, error: null, loading: false},
// 	lastDevice: {device: null, error: null, loading: false},
export default function(state = INITIAL_STATE, action) {
	let error;
	switch(action.type) {
		case FETCH_PAIRED_DEVICES:
			return { ...state, pairedDevicesList: {devices: [], error: null, loading: true} };
		case FETCH_PAIRED_DEVICES_SUCCESS:
			return { ...state, pairedDevicesList: {devices: action.payload, error: null, loading: false} };
		case FETCH_PAIRED_DEVICES_FAILURE:
			error = action.payload || {message: action.payload.message};
			return { ...state, pairedDevicesList: {devices: [], error: error, loading: false} };
		case RESET_PAIRED_DEVICES:
			return { ...state, pairedDevicesList: {devices: [], error: null, loading: false} };

		case SCAN_ACTIVE_DEVICES:
			return { ...state, activeDevicesList: {devices: [], error: null, loading: true} };
		case SCAN_ACTIVE_DEVICES_SUCCESS:
			return { ...state, activeDevicesList: {devices: action.payload, error: null, loading: false} };
		case SCAN_ACTIVE_DEVICES_FAILURE:
			error = action.payload || {message: action.payload.message};
			return { ...state, activeDevicesList: {devices: [], error: error, loading: false} };
		case RESET_ACTIVE_DEVICES:
			return { ...state, activeDevicesList: {devices: [], error: null, loading: false} };

		case CONNECT_TO_DEVICE:
			return { ...state, connection: {status: state.connection.status, channel: null, connection: null, activeDevice: action.payload, lastDevice: {...state.connection.lastDevice}, error: null, loading: true } };
		case CONNECT_TO_DEVICE_SUCCESS:
			return { ...state, connection: {status: true, channel: {...state.connection.channel}, connection: action.payload, activeDevice: {...state.connection.activeDevice}, lastDevice: {...state.connection.lastDevice}, error: null, loading: false } };
		case FIND_SERIAL_PORT_CHANNEL_SUCCESS:
			return { ...state, connection: {status: false, channel: action.payload, connection: null, activeDevice: {...state.connection.activeDevice}, lastDevice: {...state.connection.lastDevice}, error: null, loading: false } };
		case CONNECT_TO_DEVICE_FAILURE:
			error = action.payload || { message: action.payload.message };
			return { ...state, connection: {status: false, channel: null, connection: null, activeDevice: null, lastDevice: {...state.connection.lastDevice}, error: error, loading: false } };

		case DISCONNECT_FROM_DEVICE:
			return { ...state, connection: {status: state.connection.status, channel: {...state.connection.channel}, connection: action.payload, activeDevice: {...state.connection.activeDevice}, lastDevice: {...state.connection.lastDevice}, error: null, loading: true } };
		case DISCONNECT_FROM_DEVICE_SUCCESS:
			return { ...state, connection: {status: false, channel: null, connection: null, activeDevice: null, lastDevice: {...state.connection.activeDevice}, error: null, loading: false } };
		case DISCONNECT_FROM_DEVICE_FAILURE:
			error = action.payload || {message: action.payload.message};
			return { ...state, connection: {status: state.connection.status, channel: {...state.connection.channel}, connection: {...state.connection.connection}, activeDevice: {...state.connection.activeDevice}, lastDevice: {...state.connection.lastDevice}, error: error, loading: false } };

		case READ_DATA_FROM_DEVICE:
			return {...state, readData: {data: null, error: null, loading: true} };
		case READ_DATA_FROM_DEVICE_SUCCESS:
			return {...state, readData: {data: action.payload, error: null, loading: false} };
		case READ_DATA_FROM_DEVICE_FAILURE:
			error = action.payload || {message: action.payload.message};
			return {...state, readData: {data: null, error: error, loading: false} };

		case WRITE_DATA_TO_DEVICE:
			return {...state, writeData: {data: action.payload, error: null, loading: true} };
		case WRITE_DATA_TO_DEVICE_SUCCESS:
			return {...state, writeData: {data: null, error: null, loading: false} };
		case WRITE_DATA_TO_DEVICE_FAILURE:
			error = action.payload || {message: action.payload.message};
			return {...state, writeData: {data: null, error: error, loading: false} };

		default:
			return state;
	}
}
