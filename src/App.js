import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
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
	      <Sidebar />
	      <div id="wrapper">
					<Sessions />
		      <Cattlemax />
		      <Tags />
		      <Scales />
		      <Settings />
		      <Help />
	      </div>
	      <Footer />
      </div>
    );
  }
}

export default App;
