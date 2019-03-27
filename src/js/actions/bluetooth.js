/**
 * React Actions
 * */
export const FETCH_PAIRED_DEVICES = 'FETCH_PAIRED_DEVICES';
export const FETCH_PAIRED_DEVICES_SUCCESS = 'FETCH_PAIRED_DEVICES_SUCCESS';
export const FETCH_PAIRED_DEVICES_FAILURE = 'FETCH_PAIRED_DEVICES_FAILURE';
export const RESET_PAIRED_DEVICES = 'RESET_PAIRED_DEVICES';

export const SCAN_ACTIVE_DEVICES = 'SCAN_ACTIVE_DEVICES';
export const SCAN_ACTIVE_DEVICES_SUCCESS = 'SCAN_ACTIVE_DEVICES_SUCCESS';
export const SCAN_ACTIVE_DEVICES_FAILURE = 'SCAN_ACTIVE_DEVICES_FAILURE';
export const RESET_ACTIVE_DEVICES = 'RESET_ACTIVE_DEVICES';

export const CONNECT_TO_DEVICE = 'CONNECT_TO_DEVICE';
export const CONNECT_TO_DEVICE_SUCCESS = 'CONNECT_TO_DEVICE_SUCCESS';
export const CONNECT_TO_DEVICE_FAILURE = 'CONNECT_TO_DEVICE_FAILURE';
export const FIND_SERIAL_PORT_CHANNEL_SUCCESS = 'FIND_SERIAL_PORT_CHANNEL_SUCCESS';

export const DISCONNECT_FROM_DEVICE = 'DISCONNECT_FROM_DEVICE';
export const DISCONNECT_FROM_DEVICE_SUCCESS = 'DISCONNECT_FROM_DEVICE_SUCCESS';
export const DISCONNECT_FROM_DEVICE_FAILURE = 'DISCONNECT_FROM_DEVICE_FAILURE';

export const READ_DATA_FROM_DEVICE = 'READ_DATA_FROM_DEVICE';
export const READ_DATA_FROM_DEVICE_SUCCESS = 'READ_DATA_FROM_DEVICE_SUCCESS';
export const READ_DATA_FROM_DEVICE_FAILURE = 'READ_DATA_FROM_DEVICE_FAILURE';

export const WRITE_DATA_TO_DEVICE = 'WRITE_DATA_TO_DEVICE';
export const WRITE_DATA_TO_DEVICE_SUCCESS = 'WRITE_DATA_TO_DEVICE_SUCCESS';
export const WRITE_DATA_TO_DEVICE_FAILURE = 'WRITE_DATA_TO_DEVICE_FAILURE';

export function fetchPairedDevices(event, args) {
	return {
		type: FETCH_PAIRED_DEVICES,
		payload: args
	}
}

export function fetchPairedDevicesSuccess(devices) {
	return {
		type: FETCH_PAIRED_DEVICES_SUCCESS,
		payload: devices
	}
}

export function fetchPairedDevicesFailure(error) {
	return {
		type: FETCH_PAIRED_DEVICES_FAILURE,
		payload: error
	}
}

export function resetPairedDevices() {
	return {
		type: RESET_PAIRED_DEVICES
	}
}


export function scanActiveDevices(event, args) {
	return {
		type: SCAN_ACTIVE_DEVICES,
		payload: args
	}
}

export function scanActiveDevicesSuccess(devices) {
	return {
		type: SCAN_ACTIVE_DEVICES_SUCCESS,
		payload: devices
	}
}

export function scanActiveDevicesFailure(error) {
	return {
		type: SCAN_ACTIVE_DEVICES_FAILURE,
		payload: error
	}
}

export function resetActiveDevices() {
	return {
		type: RESET_ACTIVE_DEVICES
	}
}

export function connectToDevice(device) {
	return {
		type: CONNECT_TO_DEVICE,
		payload: device
	}
}

export function connectToDeviceSuccess(connection) {
	return {
		type: CONNECT_TO_DEVICE_SUCCESS,
		payload: connection
	}
}

export function findSerialPortChannelSuccess(connection) {
	return {
		type: FIND_SERIAL_PORT_CHANNEL_SUCCESS,
		payload: connection
	}
}

export function connectToDeviceFailure(error) {
	return {
		type: CONNECT_TO_DEVICE_FAILURE,
		payload: error
	}
}

export function disconnectFromDevice() {
	return {
		type: DISCONNECT_FROM_DEVICE
	}
}

export function disconnectFromDeviceSuccess() {
	return {
		type: DISCONNECT_FROM_DEVICE_SUCCESS
	}
}

export function disconnectFromDeviceFailure(error) {
	return {
		type: DISCONNECT_FROM_DEVICE_FAILURE,
		payload: error
	}
}


export function readDataFromDevice() {
	return {
		type: READ_DATA_FROM_DEVICE
	}
}

export function readDataFromDeviceSuccess(data) {
	return {
		type: READ_DATA_FROM_DEVICE_SUCCESS,
		payload: data
	}
}

export function readDataFromDeviceFailure(error) {
	return {
		type: READ_DATA_FROM_DEVICE_FAILURE,
		payload: error
	}
}

export function writeDataToDevice(data) {
	return {
		type: WRITE_DATA_TO_DEVICE,
		payload: data
	}
}

export function writeDataToDeviceSuccess(response) {
	return {
		type: WRITE_DATA_TO_DEVICE_SUCCESS,
		payload: response
	}
}

export function writeDataToDeviceFailure(error) {
	return {
		type: WRITE_DATA_TO_DEVICE_FAILURE,
		payload: error
	}
}