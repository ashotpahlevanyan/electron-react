import React, { Component } from 'react';
import { Button } from 'reactstrap';
import axios from "axios";
import BluetoothContainer from '../containers/BluetoothContainer';

let electron; // = setTimeout(function(){window.require('electron')}, 2000);
let ipcRenderer; // = electron.ipcRenderer;

async function loadDeps() {
	electron = await window.require('electron');
	ipcRenderer = await electron.ipcRenderer;
}

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			devices: '',
			selectedDevice: {}
		};

		this.handleClick = this.handleClick.bind(this);
		this.renderDevices = this.renderDevices.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	}

	componentDidMount() {
		loadDeps()
			.then(() => {
				ipcRenderer.on('all-devices-list', (event, arg) => {
					console.log('devicesList', arg);
					const {devices} = arg;

					this.setState({devices: devices[0], selectedDevice: devices[0][0].address});
					console.log(this.state);
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

	handleClick() {
		loadDeps()
			.then(() => {
				ipcRenderer.send('list-all-devices');
			});
	}
	handleSelect(event) {
		this.setState({selectedDevice: event.target.value});
		console.log(this.state);
	}
	renderDevices = () => {
		const devices = this.state.devices;
		if(!(devices && devices.length)) {
			return <div>No Device Found</div>;
		}
		const deviceList = devices.map((device, index) => {
			return <option key={index} value={device.address}>{device.name} -- {device.address}</option>
		});
		return <select name="devices" id="devices" onChange={this.handleSelect} value={this.state.selectedDevice}>{deviceList}</select>;
	};

	render() {
		return (
			<section className="wrapper fullscreen home">
				<h2>Home</h2>
				<BluetoothContainer/>
				<div className="form-group">
					<Button color="primary" onClick={this.handleClick}>Scan Bluetooth</Button>
				</div>
				<div>
					{this.renderDevices()}
				</div>
			</section>
		);
	}
}

export default Home;