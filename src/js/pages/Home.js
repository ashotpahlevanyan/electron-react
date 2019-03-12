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
			bt: '',
			readData: 'Empty'
		};

		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		loadDeps()
			.then(() => {
				ipcRenderer.on('all-devices-list', (event, arg) => {
					console.log('devicesList', arg);
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
	render() {
		return (
			<section className="wrapper fullscreen home">
				<h2>Home</h2>
				<BluetoothContainer/>
				<div className="form-group">
					<Button color="primary" onClick={this.handleClick}>Scan Bluetooth</Button>
				</div>
				<div className="state">{this.state.devices.length ? this.state.devices[0] : "No Device Found Yet."}</div>
				<div className="state">{this.state.readData}</div>
			</section>
		);
	}
}

export default Home;