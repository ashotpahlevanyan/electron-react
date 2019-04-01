import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from '../components/Footer';

class Sidebar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			closed: true
		};

		this.handleToggleClick = this.handleToggleClick.bind(this);
	}

	componentDidMount() {
		//window.addEventListener('click', this.handleToggleClick);
	}
	componentWillUnmount() {
		//window.removeEventListener('click', this.handleToggleClick);
	}

	// function getClosest(elem, selector) {
	//
	// 	// Element.matches() polyfill
	// 	if (!Element.prototype.matches) {
	// 		Element.prototype.matches =
	// 			Element.prototype.matchesSelector ||
	// 			Element.prototype.mozMatchesSelector ||
	// 			Element.prototype.msMatchesSelector ||
	// 			Element.prototype.oMatchesSelector ||
	// 			Element.prototype.webkitMatchesSelector ||
	// 			function(s) {
	// 				var matches = (this.document || this.ownerDocument).querySelectorAll(s),
	// 					i = matches.length;
	// 				while (--i >= 0 && matches.item(i) !== this) {}
	// 				return i > -1;
	// 			};
	// 	}
	//
	// 	// Get the closest matching element
	// 	for ( ; elem && elem !== document; elem = elem.parentNode ) {
	// 		if ( elem.matches( selector ) ) return elem;
	// 	}
	// 	return null;
	//
	// }

	handleToggleClick(e) {
		e.preventDefault();
		// if (!e.target.classList.contains('sidebar')) {
		// 	this.setState({closed: true});
		// } else {
			this.setState({closed: !this.state.closed});
		// }
	}

	render() {
		return(
			<section id="sidebar" className={this.state.closed ? "sidebar closed" : "sidebar"}>
				<button className="toggle" onClick={this.handleToggleClick}>
					{/*<img src="./images/titleLogo.png" alt="toggle"/>*/}
					<FontAwesomeIcon className="faicon" icon={this.state.closed ? "bars" : "chevron-left"}/>
				</button>
				<div className="inner">
					<NavLink to="/" className="logo full"><img src="./images/TagMax-2x.png" alt="Logo"/></NavLink>
					<NavLink to="/" className="logo icon"><img src="./images/titleLogo.png" alt="Logo"/></NavLink>
					<nav>
						<ul>
							<li><NavLink to="/bluetooth" activeClassName="active"><FontAwesomeIcon icon={["fab", "bluetooth"]}/><span className="text">Bluetooth</span></NavLink></li>
							<li><NavLink to="/sessions" activeClassName="active"><FontAwesomeIcon icon="list-alt"/><span className="text">Sessions</span></NavLink></li>
							<li><NavLink to="/cattlemax" activeClassName="active"><FontAwesomeIcon icon="home"/><span className="text">CattleMax</span></NavLink></li>
							{/*<li><NavLink to="/tags" activeClassName="active"><FontAwesomeIcon icon="shopping-cart"/>Shop CattleTags.com</NavLink></li>
							<li><NavLink to="/scales" activeClassName="active"><FontAwesomeIcon icon="shopping-cart"/>Shop CattleScales.com</NavLink></li>
							<li><NavLink to="/settings" activeClassName="active"><FontAwesomeIcon icon="cog"/>Settings</NavLink></li>
							<li><NavLink to="/help" activeClassName="active"><FontAwesomeIcon icon="question-circle"/>Help</NavLink></li>*/}
						</ul>
					</nav>
					<Footer />
				</div>

			</section>
		);
	}
}

export default Sidebar;