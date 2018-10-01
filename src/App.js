import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Devtools from 'mobx-react-devtools';
import Header from './components/header/Header.js';
import Layout from './components/common/layout';
import UserIndex from './components/user';
import Dashboard from './components/dashboard/dashboard';
import './App.css';

class App extends Component {
	componentDidMount() {
		sessionStorage.setItem(
			'activeUserState',
			sessionStorage.getItem('activeUserState') || 'loggedout'
		);
	}
	render() {
		return (
			<Router>
				<div>
					<Devtools />
					<Header />
					<Layout>
						<Route
							exact
							path="/"
							render={() => (
								<Redirect
									to={
										sessionStorage.getItem('activeUserState') === 'loggedin'
											? '/dashboard'
											: '/user'
									}
								/>
							)}
						/>
						<Route path="/user" component={UserIndex} />
						<Route path="/dashboard" component={Dashboard} />
					</Layout>
				</div>
			</Router>
		);
	}
}

export default App;
