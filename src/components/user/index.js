import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { view } from 'react-easy-state';
import { authStore } from '../../lib/store.js';

import Login from './login.js';
import ForgotPassword from './forgotPassword.js';
import MyAccount from './myAccount.js';
import CreateUser from './create';

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
        <Route
          exact
          path={`${this.props.match.url}`}
          render={() => (
            <Redirect
              to={authStore.isLoggedIn ? '/user/my-account' : '/user/login'}
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
        <Route path={`${this.props.match.url}/create`} component={CreateUser} />
      </div>
    );
  }
}

export default view(UserIndex);
