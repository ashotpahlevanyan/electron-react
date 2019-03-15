/**
 * React Actions
 * */
export const FETCH_DEVICES = 'FETCH_DEVICES';
export const FETCH_DEVICES_SUCCESS = 'FETCH_DEVICES_SUCCESS';
export const FETCH_DEVICES_FAILURE = 'FETCH_DEVICES_FAILURE';
export const RESET_DEVICES = 'RESET_DEVICES';

export const CONNECT_DEVICE = 'CONNECT_DEVICE';
export const CONNECT_DEVICE_SUCCESS = 'CONNECT_DEVICE_SUCCESS';
export const CONNECT_DEVICE_FAILURE = 'CONNECT_DEVICE_FAILURE';

export const DISCONNECT_DEVICE = 'DISCONNECT_DEVICE';
export const DISCONNECT_DEVICE_SUCCESS = 'DISCONNECT_DEVICE_SUCCESS';
export const DISCONNECT_DEVICE_FAILURE = 'DISCONNECT_DEVICE_FAILURE';

export const READ_DEVICE_DATA = 'READ_DEVICE_DATA';
export const READ_DEVICE_DATA_SUCCESS = 'READ_DEVICE_DATA_SUCCESS';
export const READ_DEVICE_DATA_FAILURE = 'READ_DEVICE_DATA_FAILURE';

export const WRITE_DEVICE_DATA = 'WRITE_DEVICE_DATA';
export const WRITE_DEVICE_DATA_SUCCESS = 'WRITE_DEVICE_DATA_SUCCESS';
export const WRITE_DEVICE_DATA_FAILURE = 'WRITE_DEVICE_DATA_FAILURE';

export function fetchDevices(event, args) {
	return {
		type: FETCH_DEVICES,
		payload: args
	}
}

export function fetchDevicesSuccess(devices) {
	return {
		type: FETCH_DEVICES_SUCCESS,
		payload: devices
	}
}

export function fetchDevicesFailure(error) {
	return {
		type: FETCH_DEVICES_FAILURE,
		payload: error
	}
}

export function resetDevices() {
	return {
		type: RESET_DEVICES
	}
}

export function connectDevice(device) {
	return {
		type: CONNECT_DEVICE,
		payload: device
	}
}

export function connectDeviceSuccess(connection) {
	return {
		type: CONNECT_DEVICE_SUCCESS,
		payload: connection
	}
}

export function connectDeviceFailure(error) {
	return {
		type: CONNECT_DEVICE_FAILURE,
		payload: error
	}
}

export function disconnectDevice(connection) {
	return {
		type: DISCONNECT_DEVICE,
		payload: connection
	}
}

export function disconnectDeviceSuccess() {
	return {
		type: DISCONNECT_DEVICE_SUCCESS
	}
}

export function disconnectDeviceFailure(error) {
	return {
		type: DISCONNECT_DEVICE_FAILURE,
		payload: error
	}
}


export function readDeviceData() {
	return {
		type: READ_DEVICE_DATA
	}
}

export function readDeviceDataSuccess(data) {
	return {
		type: READ_DEVICE_DATA_SUCCESS,
		payload: data
	}
}

export function readDeviceDataFailure(error) {
	return {
		type: READ_DEVICE_DATA_FAILURE,
		payload: error
	}
}

export function writeDeviceData(data) {
	return {
		type: WRITE_DEVICE_DATA,
		payload: data
	}
}

export function writeDeviceDataSuccess(response) {
	return {
		type: WRITE_DEVICE_DATA_SUCCESS,
		payload: response
	}
}

export function writeDeviceDataFailure(error) {
	return {
		type: WRITE_DEVICE_DATA_FAILURE,
		payload: error
	}
}