import React, {Component} from 'react';
import { Button } from 'reactstrap';

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