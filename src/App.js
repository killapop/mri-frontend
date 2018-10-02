import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { view } from 'react-easy-state';
import { authStore } from './lib/store.js';
import Header from './components/header/Header.js';
import Layout from './components/common/layout';
import Messages from './components/common/messages';
import UserIndex from './components/user';
import Clock from './components/common/clock';
import Dashboard from './components/dashboard/dashboard';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.loggedIn = this.loggedIn.bind(this);
    this.logout = this.logout.bind(this);
    this.startClock = this.startClock.bind(this);
    this.stopClock = this.stopClock.bind(this);
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
    authStore.messages.push({ message: 'logged out', level: 'success' });
  }

  startClock() {
    this.clockTimer = window.setInterval(() => {
      let c = this.state.clock;
      c--;
      this.setState(state => ({
        clock: c
      }));
    }, 1000);
  }

  stopClock() {
    this.setState(state => ({ clock: 3600 }));
    window.clearInterval(this.clockTimer);
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
                <Clock
                  clock={new Date(this.state.clock * 1000)
                    .toISOString()
                    .substr(14, 5)}
                  startClock={this.startClock}
                  stopClock={this.stopClock}
                />
                <span onClick={this.logout} className="logout">
                  <i className="fas fa-sign-out-alt fa-15x" />Logout
                </span>
              </div>
            ) : (
              ''
            )}
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
