import React, {Component} from 'react';
import { Button } from 'reactstrap';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			devices: [],
			bt: ''
		};

		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		ipcRenderer.on('mr-scan', (event, arg) => {
			console.log('mr-scan', arg);
		});
	}

	handleClick() {
		ipcRenderer.send('rm-scan', 'ping');
	}




	render() {
		return (
			<section className="wrapper fullscreen home">
				<h2>Home</h2>
				<div className="form-group">
					<Button color="primary" onClick={this.handleClick}>Scan Bluetooth</Button>
				</div>
				<div className="state">{this.state.devices.length ? this.state.devices : "No Device Found Yet."}</div>

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