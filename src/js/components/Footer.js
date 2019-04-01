import React, { Component } from 'react';

class Footer extends Component {
	render() {
		return (
			<footer id="footer" className="wrapper footer">
				<div className="inner">
					<ul className="menu">
						<li>&copy; <span className="text long">A Product of CattleMax.</span><span className="text short">CM</span></li>
						<li><span className="text long">All rights reserved.</span></li>
					</ul>
				</div>
			</footer>
		);
	}
}

export default Footer;
