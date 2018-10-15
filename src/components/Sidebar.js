import React from 'react';
//import {FontAwesomeIcon} from '../../node_modules/@fortawesome/react-fontawesome/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome , faListAlt, faShoppingCart, faCog, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
const Sidebar = () => {
	return (
		<section id="sidebar" className="sidebar">
			<div class="inner">
				<nav>
					<ul>
						<li><a href="#sessions"><FontAwesomeIcon icon={faListAlt}/>Sessions</a></li>
						<li><a href="#cattlemax"><FontAwesomeIcon icon={faHome}/>CattleMax</a></li>
						<li><a href="#tags"><FontAwesomeIcon icon={faShoppingCart}/>Shop CattleTags.com</a></li>
						<li><a href="#scales"><FontAwesomeIcon icon={faShoppingCart}/>Shop CattleScales.com</a></li>
						<li><a href="#settings"><FontAwesomeIcon icon={faCog}/>Settings</a></li>
						<li><a href="#help"><FontAwesomeIcon icon={faQuestionCircle}/>Help</a></li>
					</ul>
				</nav>
			</div>
		</section>
	);
};

export default Sidebar;