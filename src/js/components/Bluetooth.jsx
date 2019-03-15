import React, { Component } from 'react';
//import initIpcRenderer from './Dependencies';
import LoadingSpinner from './LoadingSpinner';
import { Alert, Button } from 'reactstrap';

//let ipcRenderer;

class Bluetooth extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedAddress: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleConnect = this.handleConnect.bind(this);
		this.handleDisconnect = this.handleDisconnect.bind(this);
	}

	componentDidMount() {
		this.props.fetchDevices();
	}

	handleChange(event) {
		this.setState({selectedAddress: event.target.value});
	}

	handleConnect() {
		this.props.connectDevice({name: "LPR_04572", address: "00-04-3e-9d-36-f4"});
	}

	handleDisconnect(event) {

	}

	renderDevicesList(devices) {
		if(devices.loading) {
			return <LoadingSpinner color='info' size='lg'/>
		} else if(devices.error) {
			return <Alert color='danger' className='pinned'>{`Error: ${devices.error.message}`}</Alert>
		}

		return (
			<div className="devices container">
				<div>Device List</div>
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

	renderConnection(conn) {
		const {connection, activeDevice, lastDevice, error, loading} = conn;
		if(loading) {
			return <LoadingSpinner color='info' size='lg'/> ;
		} else if(error) {
			return <Alert color='danger' className='pinned'>{`Error: ${error.message}`}</Alert> ;
		}
		return (
			<div className="devices container">
				<div>Connection</div><br/>
				<div>{connection}</div>
				<div>{activeDevice}</div>
				<div>{lastDevice}</div>
				<Button color="info" onClick={this.handleConnect}>Connect</Button>{' '}
				<Button color="danger" onClick={this.handleDisconnect}>Disconnect</Button>
			</div>
		);
	}

	renderReadData(readData) {

	}

	renderWriteData(writeData) {

	}

	render() {
		const { devicesList, connection, readData, writeData } = this.props.bluetooth;
		console.log( devicesList, connection, readData, writeData );

		return (
			<div className="container">
				<div>Bluetooth</div>
				{this.renderDevicesList(devicesList)}
				{this.renderConnection(connection)}
				{this.renderReadData(readData)}
				{this.renderWriteData(writeData)}
			</div>
		);
	}
}


export default Bluetooth;