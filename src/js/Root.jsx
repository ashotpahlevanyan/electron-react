import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import UpToTop from './components/UpToTop';
import Sidebar from './pages/Sidebar';
import Home from './pages/Home';
import Sessions from './pages/Sessions';
import Cattlemax from './pages/Cattlemax';
import BluetoothContainer from './containers/BluetoothContainer';



import Tags from './pages/Tags';
import Scales from './pages/Scales';
import Settings from './pages/Settings';
import Help from './pages/Help';
import Footer from './components/Footer';
import library from './components/FontAwesomeLibrary';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'sass-material-colors';
import '../scss/main.scss';


const history = createBrowserHistory();

const Root = ({ store }) => (
	<Provider store={store}>
		<Router history={history}>
			<Fragment>
				<Sidebar />
				<div id="wrapper" className="sidebarWrapper">
					<Route exact path="/" component={BluetoothContainer} />
					<Route path="/bluetooth" component={BluetoothContainer} />
					<Route path="/home" component={Home} />
					<Route path="/sessions" component={Sessions} />
					<Route path="/cattlemax" component={Cattlemax} />
					{/*<Route path="/tags" component={Tags} />
					<Route path="/scales" component={Scales} />
					<Route path="/settings" component={Settings} />
					<Route path="/help" component={Help} />*/}
				</div>
				<UpToTop />
			</Fragment>
		</Router>
	</Provider>
);

Root.propTypes = {
	store: PropTypes.object.isRequired
};

export default Root;