import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from '../components/Footer';

class Sidebar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			closed: false
		};

		this.handleToggleClick = this.handleToggleClick.bind(this);
	}
	handleToggleClick(e) {
		e.preventDefault();
		this.setState({closed: !this.state.closed});
	}
	render() {
		return(
			<section id="sidebar" className={this.state.closed ? "sidebar closed" : "sidebar"}>
				<button className="toggle" onClick={this.handleToggleClick}>
					{/*<img src="./images/titleLogo.png" alt="toggle"/>*/}
					<FontAwesomeIcon className="faicon" icon={this.state.closed ? "bars" : "chevron-left"}/>
				</button>
				<div className="inner">
					<NavLink to="/" className="logo"><img src="./images/TagMax-2x.png" alt="Logo"/></NavLink>
					<nav>
						<ul>
							<li><NavLink to="/sessions" activeClassName="active"><FontAwesomeIcon icon="list-alt"/>Sessions</NavLink></li>
							<li><NavLink to="/cattlemax" activeClassName="active"><FontAwesomeIcon icon="home"/>CattleMax</NavLink></li>
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