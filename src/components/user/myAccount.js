import React from 'react';
import { authStore } from '../../lib/store.js';
import { view } from 'react-easy-state';
import { Redirect } from 'react-router-dom';
import '../../assets/css/forms.css';

class MyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.logout = this.logout.bind(this);
  }

  logout() {
    authStore.isLoggedIn = false;
    authStore.token = '';
    authStore.messages.push({ message: 'logged out', level: 'success' });
  }

  render() {
    return (
      <div>
        {authStore.isLoggedIn ? (
          <div>
            <span
              onClick={this.logout}
              className="absolute top-0 gray dim flex flex-column justify-around items-center right-0 pointer ma3">
              <i className="fas fa-sign-out-alt  fa-2x" />Logout
            </span>
            <div className="center small-box w-90 w-50-ns bg-very-very-light shadow-light pa4 mt6 ba b--very-ver-light ">
              MYACCOUNT!!!!
            </div>
          </div>
        ) : (
          <Redirect to="/" />
        )}
      </div>
    );
  }
}

export default view(MyAccount);
