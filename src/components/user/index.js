import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { view } from 'react-easy-state';

import Login from './login.js';
import ForgotPassword from './forgotPassword.js';
import EditAccount from './editAccount.js';
import CreateUser from './create';
import ActivateUser from './activate';
import InvalidateActivation from './invalidate';

import '../../assets/css/forms.css';

class UserIndex extends React.Component {
  render() {
    return (
      <div>
        <Route
          exact
          path={`${this.props.match.url}`}
          render={() => <Redirect to="/user/my-account" />}
        />
        <Route path={`${this.props.match.url}/login`} component={Login} />
        <Route
          path={`${this.props.match.url}/forgot-password`}
          component={ForgotPassword}
        />
        <Route path={`${this.props.match.url}/edit`} component={EditAccount} />
        <Route path={`${this.props.match.url}/create`} component={CreateUser} />
        <Route
          path={`${this.props.match.url}/activate/:token`}
          component={ActivateUser}
        />
        <Route
          path={`${this.props.match.url}/invalidate/:token`}
          component={InvalidateActivation}
        />
      </div>
    );
  }
}

export default view(UserIndex);
