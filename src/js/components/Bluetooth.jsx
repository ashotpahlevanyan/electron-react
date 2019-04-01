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

		this.handlePairedChange = this.handlePairedChange.bind(this);
		this.handleActiveChange = this.handleActiveChange.bind(this);
		this.handleConnect = this.handleConnect.bind(this);
		this.handleDisconnect = this.handleDisconnect.bind(this);
		this.handleFetchPairedDevices = this.handleFetchPairedDevices.bind(this);
		this.handleScanActiveDevices = this.handleScanActiveDevices.bind(this);
	}

	handlePairedChange(event) {
		this.setState({selectedAddress: event.target.value});
	}

	handleActiveChange(event) {
		this.setState({selectedActiveAddress: event.target.value});
	}

	handleFetchPairedDevices() {
		this.props.fetchPairedDevices();
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
			<div className="itemWrapper">
				<Button color="info" onClick={this.handleFetchPairedDevices}>Fetch Paired Devices</Button>
				{(devices.devices && devices.devices.length) ?
					<div className="pairedDevices">
						<h3>Paired Devices</h3>
						<select name="devices"
						        id="devices"
						        className="form-control"
						        onChange={this.handlePairedChange}
						        value={this.state.selectedAddress}
						>
							{devices.devices.map((device) =>
								<option key={device.address} value={device.address}>
									{device.name} -- {device.address}
								</option>)
							}
						</select>
					</div> :
					<div className="warning">No Paired Devices Found.</div>}
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
			<div className="itemWrapper">
				<Button color="info" onClick={this.handleScanActiveDevices}>Scan Active Devices</Button>
				{(devices.devices && devices.devices.length) ?
					<div className="activeDevices">
						<h3>Active Devices</h3>
						<select name="activeDevices"
						        id="activeDevices"
						        className="form-control"
						        onChange={this.handleActiveChange}
						        value={this.state.selectedAddress}
						>
							{devices.devices.map((device) =>
								<option key={device.address} value={device.address}>
									{device.name} -- {device.address}
								</option>)
							}
						</select>
					</div> :
					<div className="warning">No Active Devices Found.</div>}
			</div>
		);
	}

	renderConnection(connection) {
		const {status} = connection;
		return (
			<div className="itemWrapper">
				<Button color="success" className="col-xs-6" onClick={this.handleConnect}>Connect</Button>{' '}
				<Button color="danger" className="col-xs-6" onClick={this.handleDisconnect}>Disconnect</Button>
				<h3 className={status ? "connected" : "disconnected"}>{status ? 'Device IS Connected' : 'Device NOT Connected'}</h3>
			</div>
		);
	}

	renderReadData(readData) {
		const {data} = readData;
		return (
			<div className="itemWrapper">
				<h3>Data Read from Scanner</h3>
				<h3 className={data ? "connected" : "disconnected"}>{data ? data : "No Data Read"}</h3>
			</div>
		);
	}

	renderWriteData(writeData) {
	}

	render() {
		const { pairedDevicesList, activeDevicesList, connection, readData, writeData } = this.props.bluetooth;
		const {status} = connection;
		console.log( pairedDevicesList, activeDevicesList, connection, readData, writeData, status );

		return (
			<div className="bluetooth-wrapper">
				<div className="container-fluid">
					<h2 className="header">Bluetooth Interaction</h2>
					{this.renderPairedDevicesList(pairedDevicesList)}
					{this.renderActiveDevicesList(activeDevicesList)}
					{this.renderConnection(connection)}
					{this.renderReadData(readData)}
					{this.renderWriteData(writeData)}
				</div>
			</div>
		);
	}
}


export default Bluetooth;