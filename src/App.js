import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header/Header.js';
import UserIndex from './components/user';

import './App.css';

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Header />
					<Route exact path="/" component={UserIndex} />
					<Route path="/user" component={UserIndex} />
				</div>
			</Router>
		);
	}
}

export default App;
