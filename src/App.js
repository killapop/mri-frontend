import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { view } from 'react-easy-state';
import { StickyContainer, Sticky } from 'react-sticky';
import { authStore, messages } from './lib/store.js';
import Header from './components/header/Header.js';
import Layout from './components/common/layout';
import Messages from './components/common/messages';
import UserIndex from './components/user';
import FormsIndex from './components/applications';
// import Clock from './components/common/clock';
import Dashboard from './components/dashboard/dashboard';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.loggedIn = this.loggedIn.bind(this);
  }

  loggedIn() {
    return authStore.isLoggedIn;
  }

  render() {
    return (
      <StickyContainer>
        <Router>
          <div>
            <Sticky topOffset={10}>
              {({ style, isSticky }) => (
                <div style={style} className="z-999">
                  <Header sticky={isSticky} />
                </div>
              )}
            </Sticky>
            <Layout>
              {/* {messages.messages.length > 0 ? (
                <Messages messages={messages.messages} />
                ) : (
                ''
              )} */}
              <Route
                exact
                path="/"
                render={() =>
                  authStore.isLoggedIn ? (
                    <Dashboard />
                  ) : (
                    <Redirect to="/users/login" />
                  )
                }
              />
              <Route path="/users" component={UserIndex} />
              <Route path="/applications" component={FormsIndex} />
              <Route path="/dashboard" component={Dashboard} />
            </Layout>
          </div>
        </Router>
      </StickyContainer>
    );
  }
}

export default view(App);
