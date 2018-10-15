import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import Intro from './components/Intro';
import One from './components/One';
import Two from './components/Two';
import Three from './components/Three';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
	      <Sidebar />
	      <div id="wrapper">
					<Intro />
		      <One />
		      <Two />
		      <Three />
	      </div>
	      <Footer />
      </div>
    );
  }
}

export default App;
