import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from './login.js';
import ForgotPassword from './forgotPassword.js';
import MyAccount from './myAccount.js';

import '../../assets/css/forms.css';

class UserIndex extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeUserState: sessionStorage.getItem('activeUserState')
		};
	}

	render() {
		return (
			<div>
				Hello
				<Route
					exact
					path={`${this.props.match.url}`}
					render={() => (
						<Redirect
							to={
								this.state.activeUserState === 'loggedin'
									? '/user/my-account'
									: '/user/login'
							}
						/>
					)}
				/>
				<Route path={`${this.props.match.url}/login`} component={Login} />
				<Route
					path={`${this.props.match.url}/forgot-password`}
					component={ForgotPassword}
				/>
				<Route
					path={`${this.props.match.url}/my-account`}
					component={MyAccount}
				/>
			</div>
		);
	}
}

export default UserIndex;
