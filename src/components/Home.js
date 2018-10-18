import React, {Component} from 'react';
import { Button } from 'reactstrap';


class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			peripherals: 'Hello'
		};

		this.handleClick = this.handleClick.bind(this);
	}
	componentDidMount() {

	}
	handleClick() {
		console.log("clicked");
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