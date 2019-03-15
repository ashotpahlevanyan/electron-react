import { connect } from 'react-redux';
import {
	fetchDevices,
	fetchDevicesSuccess,
	fetchDevicesFailure
} from '../actions/bluetooth';
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
		fetchDevices: () => {
			console.log("Dispatching fetchDevices...");
			dispatch(send(ipc.IPC_LIST_PAIRED_DEVICES));
		},
		connectDevice: (args) => {
			console.log("Dispatching connectDevice...", args);
			dispatch(send(ipc.IPC_CONNECT_DEVICE), args);
		},
		disconnectDevice: () => {
			console.log("Dispatching disconnectDevice...");
			dispatch(send(ipc.IPC_DISCONNECT_DEVICE));
		},
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Bluetooth);