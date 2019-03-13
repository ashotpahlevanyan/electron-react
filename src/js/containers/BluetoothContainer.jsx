import { connect } from 'react-redux';
import {
	fetchDevices,
	fetchDevicesSuccess,
	fetchDevicesFailure
} from '../actions/bluetooth';
import Bluetooth from '../components/Bluetooth';

const mapStateToProps = (state) => {
	return {
		bluetooth: state.bluetooth
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchDevices: () => {
			dispatch(fetchDevices()).payload
				.then(response => {
					console.log(response);
				});
		},


	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Bluetooth);