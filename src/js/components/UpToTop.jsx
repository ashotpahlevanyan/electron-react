import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import library from './FontAwesomeLibrary';

class UpTopTop extends Component {
	constructor(props) {
		super(props);

		this.state = {
			scrollTop: 0
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
	}
	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}
	handleScroll() {
		const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		this.setState({scrollTop: scrollTop});
	}

	handleClick() {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};
	render() {
		return (
			<div className={this.state.scrollTop > 200 ? "center noPrint upToTop" : "center noPrint hide upToTop"}>
				<button onClick={this.handleClick} className="up"><FontAwesomeIcon icon="chevron-up"/></button>
			</div>
		);
	}
}

export default UpTopTop;