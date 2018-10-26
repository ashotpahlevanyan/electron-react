import React, {Component} from 'react';
import { Button } from 'reactstrap';
import noble from 'noble';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			devices: 'Empty',
			bt: ''
		};

		this.handleClick = this.handleClick.bind(this);
	}
	componentDidMount() {
		noble.on('stateChange', function(state) {
			if (state === 'poweredOn') {
				noble.startScanning();
			} else {
				noble.stopScanning();
			}
		});

		noble.on('discover', function(peripheral) {
			let per =
				'id =' + peripheral.id +
				', \nwith address <' + peripheral.address +
				', \n' + peripheral.addressType +
				', \nconnectable ' + peripheral.connectable +
				', \nRSSI ' + peripheral.rssi +
				', \nhello my local name is: ' + peripheral.advertisement.localName +
			  ', \n with Services : ' + JSON.stringify(peripheral.advertisement.serviceUuids);

			this.setState(Object.assign({}, this.state, {devices: per}));
		});
	}

	handleClick() {
		//this.setState(Object.assign({}, this.state, {devices: alldevices}));
	}

	render() {
		return (
			<section className="wrapper fullscreen home">
				<h2>Home</h2>
				<div className="form-group">
					<Button color="primary" onClick={this.handleClick}>Scan Bluetooth</Button>
				</div>
				<div className="state">{this.state.devices}</div>
				<select className="select form-control">
					<option value="Ashots BT">Ashots BT</option>
					<option value="Saqo BT">2</option>
					<option value="Valod BT">3</option>
					<option value="Lyudmila BT">4</option>
				</select>
				<div className="form-group">
					<Button color="primary" onClick={this.handleClick}>Connect To Device</Button>
				</div>
			</section>
		);
	}
}

export default Home;