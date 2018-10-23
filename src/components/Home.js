import React, {Component} from 'react';
import { Button } from 'reactstrap';
//import Bluetooth from 'node-web-bluetooth';


// async function connect() {
// 	const device = await Bluetooth.requestDevice(options);
// 	const server = await device.connect();
// 	const service = await server.getPrimaryService('heart_rate');
// 	const char = await service.getCharacteristic('heart_rate_measurement');
// 	await char.startNotifications();
// 	char.on('characteristicvaluechanged', (data) => {
// 		// parse heart-rate data here
// 	});
// 	await char.stopNotifications();
// 	await server.disconnect();
// }

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			peripherals: 'Hello',
			options : {
				filters: [
					{namePrefix:'Nokia'},
					{services: ['heart_rate']},
					{services: [0x1802, 0x1803]},
					{services: ['c48e6067-5295-48d3-8d5c-0395f61792b1']},
					{name: 'ExampleName'}
				],
				optionalServices: ['battery_service']
			}
		};

		this.handleClick = this.handleClick.bind(this);
	}
	componentDidMount() {

	}
	handleClick() {
		//connect();
		navigator.bluetooth.requestDevice(this.state.options).then(function(device) {
			console.log('Name: ' + device.name);
			this.setState(Object.assign({}, this.state, {peripherals: 'Yalla'}));
			// Do something with the device.
		})
			.catch(function(error) {
				console.log("Something went wrong. " + error);
			});

	}

	render() {
		return (
			<section className="wrapper fullscreen home">
				<h2>Home</h2>
				<div className="form-group">
					<Button color="primary" onClick={this.handleClick}>Scan Bluetooth</Button>
				</div>
				<div className="state">{this.state.peripherals}</div>

			</section>
		);
	}
}

export default Home;