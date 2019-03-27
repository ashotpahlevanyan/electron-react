import React, { Component } from 'react';
//import initIpcRenderer from './Dependencies';
import LoadingSpinner from './LoadingSpinner';
import { Alert, Button } from 'reactstrap';

//let ipcRenderer;

/**
 * ========= PROPS =========
 * fetchPairedDevices()
 * scanActiveDevices()
 * connectToDevice(args)
 * writeDataToDevice(args)
 * disconnectFromDevice()
 * */

class Bluetooth extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedAddress: '',
			selectedActiveAddress: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleActiveChange = this.handleActiveChange.bind(this);
		this.handleConnect = this.handleConnect.bind(this);
		this.handleDisconnect = this.handleDisconnect.bind(this);
		this.handleScanActiveDevices = this.handleScanActiveDevices.bind(this);
	}

	componentDidMount() {
		this.props.fetchPairedDevices();
	}

	handleChange(event) {
		this.setState({selectedAddress: event.target.value});
	}

	handleActiveChange(event) {
		this.setState({selectedActiveAddress: event.target.value});
	}

	handleScanActiveDevices() {
		this.props.scanActiveDevices();
	}

	handleConnect() {
		const device = {
			address: "00-04-3e-9d-36-f4",
			name: "LPR_04572"
		};
		this.props.connectToDevice(device);
	}

	handleDisconnect() {
		this.props.disconnectFromDevice();
	}

	renderPairedDevicesList(devices) {
		if(devices.loading) {
			return <LoadingSpinner color='info' size='lg'/>
		} else if(devices.error) {
			return <Alert color='danger' className='pinned'>{`Error: ${devices.error.message}`}</Alert>
		}

		return (
			<div className="devices container">
				<div>Paired Device List</div>
				{(devices.devices && devices.devices.length) ?
					<select name="devices"
					        id="devices"
					        onChange={this.handleChange}
					        value={this.state.selectedAddress}
					>
						{devices.devices.map((device) =>
							<option key={device.address} value={device.address}>
								{device.name} -- {device.address}
							</option>)
						}
					</select>  :
					<div>No Device Found</div>}
			</div>
		);
	}

	renderActiveDevicesList(devices) {
		if(devices.loading) {
			return <LoadingSpinner color='info' size='lg'/>
		} else if(devices.error) {
			return <Alert color='danger' className='pinned'>{`Error: ${devices.error.message}`}</Alert>
		}

		return (
			<div className="devices container">
				<div>Active Device List</div>
				{(devices.devices && devices.devices.length) ?
					<select name="activeDevices"
					        id="activeDevices"
					        onChange={this.handleActiveChange}
					        value={this.state.selectedAddress}
					>
						{devices.devices.map((device) =>
							<option key={device.address} value={device.address}>
								{device.name} -- {device.address}
							</option>)
						}
					</select>  :
					<div>No Device Found</div>}
			</div>
		);
	}

	renderConnection(connection) {
		const {connectionStatus} = connection;
		// const {connection, activeDevice, lastDevice, error, loading} = conn;
		// if(loading) {
		// 	return <LoadingSpinner color='info' size='lg'/> ;
		// } else if(error) {
		// 	return <Alert color='danger' className='pinned'>{`Error: ${error.message}`}</Alert> ;
		// }
		return (
			<div className="devices container">
				{/*<div>Connection</div><br/>
				<div>{connection}</div>
				<div>{activeDevice}</div>
				<div>{lastDevice}</div>*/}
				<div><Button color="primary" onClick={this.handleScanActiveDevices}>Scan Active Devices</Button></div>
				<div>{connectionStatus ? 'Device IS Connected' : 'Device NOT Connected'}</div>
				<Button color="info" onClick={this.handleConnect}>Connect</Button>{' '}
				<Button color="danger" onClick={this.handleDisconnect}>Disconnect</Button>
			</div>
		);
	}

	renderReadData(readData) {
		const {data} = readData;
		return (
			<div>
				<h1>Data Read from Scanner</h1>
				<h2>{data}</h2>
			</div>
		);
	}

	renderWriteData(writeData) {
	}

	render() {
		const { pairedDevicesList, activeDevicesList, connection, readData, writeData } = this.props.bluetooth;
		console.log( pairedDevicesList, activeDevicesList, connection, readData, writeData );

		return (
			<div className="container">
				<div>Bluetooth</div>
				{this.renderPairedDevicesList(pairedDevicesList)}
				{this.renderActiveDevicesList(activeDevicesList)}
				{this.renderConnection(connection)}
				{this.renderReadData(readData)}
				{this.renderWriteData(writeData)}
			</div>
		);
	}
}


export default Bluetooth;