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
    this.loggedIn = this.loggedIn.bind(this);
    sessionStorage.setItem(
      'activeUserState',
      sessionStorage.getItem('activeUserState') || 'loggedout'
    );
  }
  loggedIn() {
    return sessionStorage.getItem('activeUserState') === 'loggedin';
  }
  render() {
    return (
      <Router>
        <div>
          <Devtools />
          <Header />
          <Layout>
            <Route
              exact="exact"
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

export default App;
