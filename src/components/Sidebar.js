import React from 'react';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome , faListAlt, faShoppingCart, faCog, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
	return(
		<section id="sidebar" className="sidebar">
			<div className="inner">
				<NavLink to="/" className="logo"><img src="./images/TagMax-2x.png" alt="Logo"/></NavLink>
				<nav>
					<ul>
						<li><NavLink to="/sessions" activeClassName="active"><FontAwesomeIcon icon={faListAlt}/>Sessions</NavLink></li>
						<li><NavLink to="/cattlemax" activeClassName="active"><FontAwesomeIcon icon={faHome}/>CattleMax</NavLink></li>
						<li><NavLink to="/tags" activeClassName="active"><FontAwesomeIcon icon={faShoppingCart}/>Shop CattleTags.com</NavLink></li>
						<li><NavLink to="/scales" activeClassName="active"><FontAwesomeIcon icon={faShoppingCart}/>Shop CattleScales.com</NavLink></li>
						<li><NavLink to="/settings" activeClassName="active"><FontAwesomeIcon icon={faCog}/>Settings</NavLink></li>
						<li><NavLink to="/help" activeClassName="active"><FontAwesomeIcon icon={faQuestionCircle}/>Help</NavLink></li>
					</ul>
				</nav>
			</div>
		</section>
	);
};

export default Sidebar;