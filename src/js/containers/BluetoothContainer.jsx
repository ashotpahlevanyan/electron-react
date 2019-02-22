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
			//.payload.then((response) => {
			//response ? dispatch(fetchDevicesSuccess(response.data)) : dispatch(fetchDevicesFailure(response.data));
		//});
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Bluetooth);