import {
	FETCH_DEVICES, FETCH_DEVICES_SUCCESS, FETCH_DEVICES_FAILURE, RESET_DEVICES,
	CONNECT_DEVICE, CONNECT_DEVICE_SUCCESS, CONNECT_DEVICE_FAILURE,
	DISCONNECT_DEVICE, DISCONNECT_DEVICE_SUCCESS, DISCONNECT_DEVICE_FAILURE,
	READ_DEVICE_DATA, READ_DEVICE_DATA_SUCCESS, READ_DEVICE_DATA_FAILURE,
	WRITE_DEVICE_DATA, WRITE_DEVICE_DATA_SUCCESS, WRITE_DEVICE_DATA_FAILURE
} from '../actions/bluetooth';

const INITIAL_STATE = {
	devicesList: {devices: [], error:null, loading: false},
	connectedDevice: {device: {}, error:null, loading: false},
	disconnectedDevice: {device: {}, error:null, loading: false},
	readData: {data: {}, error:null, loading: false},
	writeData: {data: {}, error:null, loading: false},
};

export default function(state = INITIAL_STATE, action) {
	let error;
	switch(action.type) {
		case FETCH_DEVICES:
			return state;
		case CONNECT_DEVICE:
			return state;
		default:
			return state;
	}
}
