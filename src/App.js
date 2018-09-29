import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header/Header.js';
import Layout from './components/common/layout';
import UserIndex from './components/user';
import Dashboard from './components/dashboard/dashboard';
import './App.css';

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Header />
					<Layout>
						<Route exact path="/" component={UserIndex} />
						<Route path="/user" component={UserIndex} />
						<Route path="/dashboard" component={Dashboard} />
					</Layout>
				</div>
			</Router>
		);
	}
}

export default App;
