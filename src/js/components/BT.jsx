import React, { Component } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { Alert, Button } from 'reactstrap';

let electron;
let ipcRenderer;

async function loadDeps() {
	electron = await window.require('electron');
	ipcRenderer = await electron.ipcRenderer;
}

class Bluetooth extends Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		loadDeps()
			.then(() => {
				ipcRenderer.on('all-devices-list', (event, arg) => {
					console.log('devicesList', arg);
					const {devices} = arg;

					this.setState({devices: devices[0], selectedAddress: devices[0][0].address});
				});

				ipcRenderer.on('device-is-connected', (event, arg) => {
					const {connected, connection} = arg;
					console.log(connected, connection);
				});

				ipcRenderer.on('device-not-connected',  (event, arg) => {
					const {error, connected} = arg;
					console.log(error, connected);
				});

				ipcRenderer.on('device-is-disconnected', (event, arg) => {
					const {disconnected, connection} = arg;
					console.log(disconnected, connection);
				});

				ipcRenderer.on('device-not-disconnected', (event, arg) => {
					const {error, disconnected} = arg;
					console.log(error, disconnected);
				});
			});
	}

	handleChange(event) {
		this.setState({selectedAddress: event.target.value});
	}

	handleClick() {
		ipcRenderer.send('list-all-devices');
	}

	handleConnect() {
		// if(this.state.devices && this.state.devices.length) {
		// 	const selectedDevice = this.state.devices.filter(item => item.address === this.state.selectedAddress);
		// 	const {address, name} = selectedDevice;
		//
		// }
		// ipcRenderer.send('connect-to-device', {
		// 	address: '00-04-3e-9d-36-f4',
		// 	name: 'LPR_04572'
		// });
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
				{/*<div className="form-group">
					<Button color="primary" onClick={this.handleClick}>List Devices</Button>
				</div>
				<div>
					{
						!(devices && devices.length) ?
							<div>No Device Found</div> :
							<select name="devices"
							        id="devices"
							        onChange={this.handleChange}
							        value={this.state.selectedAddress}
							>
								{devices.map((device) =>
									<option key={device.address} value={device.address}>
										{device.name} -- {device.address}
									</option>)
								}
							</select>
					}
				</div>
				<div>
					<Button color="primary" onClick={this.handleConnect}>Connect to Device</Button>
				</div>
				<div>
					{
						this.state.selectedAddress
					}
				</div>*/}
			</div>
		);
	}
}


export default Bluetooth;