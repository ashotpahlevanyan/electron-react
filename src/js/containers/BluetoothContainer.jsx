import { connect } from 'react-redux'
import { fetchDevices, fetchDevicesSuccess, fetchDevicesFailure } from '../actions/bluetooth';
import Bluetooth from '../components/Bluetooth';

const mapStateToProps = (state) => {
	return {
		devices: state.bluetooth.devices
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchDevices: () => {
			dispatch(fetchDevices());
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Bluetooth);