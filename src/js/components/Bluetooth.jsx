import React, { Component } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { Alert } from 'reactstrap';

class Bluetooth extends Component {
	componentWillMount() {
		this.props.fetchDevices();
	}

	render() {
		console.log(this.props);
		//const { devices, loading, error } = this.props.bluetooth.bluetooth;
		//const bt = {...this.props.bluetooth};

		// if(loading) {
		// 	return <LoadingSpinner color='info' size='lg'/>
		// } else if(error) {
		// 	return <Alert color='danger' className='pinned' message={`Error: ${error.message}`} delay={1500} />
		// }

		return (
			<div className="posts container">
				<h1>Bluetooth Devices</h1>
				{/*{devices.toString()}*/}
			</div>
		);
	}
}


export default Bluetooth;