import { connect } from 'react-redux';
import {
	fetchDevices,
	fetchDevicesSuccess,
	fetchDevicesFailure
} from '../actions/bluetooth';
import Bluetooth from '../components/Bluetooth';
import { send } from 'redux-electron-ipc';

const mapStateToProps = (state) => {
	return {
		bluetooth: state.bluetooth
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchDevices: () => {
			return send('list-all-devices');
		},


	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Bluetooth);