import { connect } from 'react-redux';
import Bluetooth from '../components/Bluetooth';
import { send } from 'redux-electron-ipc';
const ipc = require('../actions/ipcActions');

const mapStateToProps = (state) => {
	return {
		bluetooth: state.bluetooth
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchPairedDevices: () => {
			console.log("Dispatching fetchPairedDevices...");
			dispatch(send(ipc.IPC_FETCH_PAIRED_DEVICES));
		},
		scanActiveDevices: () => {
			console.log("Dispatching scanActiveDevices...");
			dispatch(send(ipc.IPC_SCAN_ACTIVE_DEVICES));
		},
		connectToDevice: (device) => {
			console.log("Dispatching connectToDevice...", device);
			dispatch(send(ipc.IPC_CONNECT_TO_DEVICE, {device:device}));
		},
		writeDataToDevice: (data) => {
			console.log("Dispatching writeDataToDevice...", data);
			dispatch(send(ipc.IPC_WRITE_DATA_TO_DEVICE, data));
		},
		disconnectFromDevice: () => {
			console.log("Dispatching disconnectFromDevice...");
			dispatch(send(ipc.IPC_DISCONNECT_FROM_DEVICE));
		},
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Bluetooth);