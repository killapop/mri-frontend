import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { view } from 'react-easy-state';
import { authStore, messages } from './lib/store.js';
import Header from './components/header/Header.js';
import Layout from './components/common/layout';
import Messages from './components/common/messages';
import UserIndex from './components/user';
import FormsIndex from './components/forms';
import Clock from './components/common/clock';
import Dashboard from './components/dashboard/dashboard';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.loggedIn = this.loggedIn.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      clock: 3600
    };
  }

  loggedIn() {
    return authStore.isLoggedIn === true;
  }

  logout() {
    authStore.isLoggedIn = false;
    authStore.token = '';
    messages.messages.push({ message: 'logged out', level: 'success' });
  }

  componentDidMount() {}

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Layout>
            {this.loggedIn() ? (
              <div className="loggedIn">
                <Clock />
                <span onClick={this.logout} className="logout">
                  <i className="fas fa-sign-out-alt fa-15x" />Logout
                </span>
              </div>
            ) : (
              ''
            )}
            {messages.messages.length > 0 ? (
              <Messages messages={messages.messages} />
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
            <Route path="/forms" component={FormsIndex} />
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
