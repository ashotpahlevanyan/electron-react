import React, {Component} from 'react';
import { Button } from 'reactstrap';
import noble from 'noble';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			peripherals: 'Hello'
		};

		this.nobleInit = this.nobleInit.bind(this);
		this.fulfilled = this.fulfilled.bind(this);
		this.rejected = this.rejected.bind(this);
		this.nobleDiscover = this.nobleDiscover.bind(this);
		// this.handleClick = this.handleClick.bind(this);
	}
	componentDidMount() {

	}
	nobleInit() {
		var promise = new Promise(function(resolve, reject) {
			noble.on('stateChange', function (state) {
				if (state === 'poweredOn') {
					//alert("poweredOn");
					noble.startScanning([{
						'listAllDevicesEvenThoughItIsAPoorUserExperience': true
					}], false);
				} else {
					noble.stopScanning();
					//alert("Stopped");
				}
			});
		});
		promise.then(this.fulfilled, this.rejected);
	}
	fulfilled() {
		//console.log("fulfilled");
	};
	rejected(error) {

	};

	nobleDiscover() {
		// noble.on('discover', function(peripheral) {
		// 	var newPer = this.state.peripherals + ", name: " + peripheral.advertisement.localName + ", udid: " + peripheral.advertisement.serviceUuids;
		// 	this.setState({peripherals: newPer});
		// });
	};

	render() {
		return (
			<section className="wrapper fullscreen home">
				<h2>Home</h2>
				<div className="form-group">
					<Button color="primary" onClick={this.nobleInit}>Scan Bluetooth</Button>
				</div>
				<div className="form-group">
					<Button color="primary" onClick={this.nobleDiscover}>Discover</Button>
				</div>
				<div className="state">{this.state.peripherals}</div>

			</section>
		);
	}
}

export default Home;