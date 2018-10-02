import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { view } from 'react-easy-state';
import { authStore } from './lib/store.js';
import Header from './components/header/Header.js';
import Layout from './components/common/layout';
import Messages from './components/common/messages';
import UserIndex from './components/user';
import Dashboard from './components/dashboard/dashboard';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.loggedIn = this.loggedIn.bind(this);
    sessionStorage.setItem(
      'activeUserState',
      sessionStorage.getItem('activeUserState') || 'loggedout'
    );
  }
  loggedIn() {
    return authStore.isLoggedIn;
  }
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Layout>
            {authStore.messages.length > 0 ? (
              <Messages messages={authStore.messages} />
            ) : (
              ''
            )}
            <Route
              exact
              path="/"
              render={() => (
                <Redirect to={this.loggedIn() ? '/dashboard' : '/user'} />
              )}
            />
            <Route path="/user" component={UserIndex} />
            <Route
              path="/dashboard"
              render={() =>
                this.loggedIn() ? <Dashboard /> : <Redirect to="/user" />
              }
            />
          </Layout>
        </div>
      </Router>
    );
  }
}

export default view(App);
