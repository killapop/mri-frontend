import React from 'react';
import SmallBox from '../common/smallBox';
import { authStore } from '../../lib/store.js';
import { view } from 'react-easy-state';
import { Redirect } from 'react-router-dom';
import '../../assets/css/forms.css';

class MyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SmallBox>
        {authStore.isLoggedIn ? (
          <div className="center small-box w-90 w-50-ns bg-very-very-light shadow-light pa4 mt6 ba b--very-ver-light ">
            AHAH
          </div>
        ) : (
          <Redirect to="/" />
        )}
      </SmallBox>
    );
  }
}

export default view(MyAccount);
