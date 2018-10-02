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

  render() {
    return (
      <div>
        {authStore.isLoggedIn ? (
          <div>
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
