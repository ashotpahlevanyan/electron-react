import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Sessions from './components/Sessions';
import Cattlemax from './components/Cattlemax';
import Tags from './components/Tags';
import Scales from './components/Scales';
import Settings from './components/Settings';
import Help from './components/Help';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
	      <Router>
		      <div>
		        <Sidebar />
			      <div id="wrapper">
				      <Route exact path="/" component={Home} />
				      <Route path="/sessions" component={Sessions} />
				      <Route path="/cattlemax" component={Cattlemax} />
				      <Route path="/tags" component={Tags} />
				      <Route path="/scales" component={Scales} />
				      <Route path="/settings" component={Settings} />
				      <Route path="/help" component={Help} />
			      </div>
		      </div>
	      </Router>
	      <Footer />
      </div>
    );
  }
}

export default App;
