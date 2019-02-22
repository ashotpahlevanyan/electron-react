import React, {Component} from 'react';
import { Button } from 'reactstrap';
import axios from "axios";

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

	componentWillMount() {
		loadDeps()
			.then(() => {
				ipcRenderer.on('mr-scan', (event, arg) => {
					console.log('mr-scan', arg);
				});
				ipcRenderer.on('mr-found', (event, arg) => {
					console.log('mr-found', arg);
				});
			});
	}

	componentDidMount() {
		axios.get("http://localhost:4000/read")
			.then(res => {
				const readData = res.data;
				console.log(readData);
				this.setState(Object.assign({}, this.state, readData));
			});
	}

	handleClick() {
		loadDeps()
			.then(() => {
				ipcRenderer.send('rm-scan', 'ping');
			});
	}

	render() {
		return (
			<section className="wrapper fullscreen home">
				<h2>Home</h2>
				<div className="form-group">
					<Button color="primary" onClick={this.handleClick}>Scan Bluetooth</Button>
				</div>
				<div className="state">{this.state.devices.length ? this.state.devices[0] : "No Device Found Yet."}</div>
				<div className="state">{this.state.readData}</div>
				{/*<select className="select form-control">
					<option value="Ashots BT">Ashots BT</option>
					<option value="Saqo BT">2</option>
					<option value="Valod BT">3</option>
					<option value="Lyudmila BT">4</option>
				</select>*/}
				{/*<div className="form-group mt-20">
					<Button color="primary" onClick={this.handleClick}>Connect To Device</Button>
				</div>*/}
			</section>
		);
	}
}

export default Home;