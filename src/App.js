import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { authStore } from "./lib/store.js";
import { StickyContainer, Sticky } from "react-sticky";
import jwt from "jsonwebtoken";
import Header from "./components/header/Header.js";
import Layout from "./components/common/layout";
import Messages from "./components/common/messages";
import UserIndex from "./components/user";
import FormsIndex from "./components/applications";
import BundlesIndex from "./components/bundles";
import Dashboard from "./components/dashboard/dashboard";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    const auth_token = window.sessionStorage.accessToken;
    if (auth_token) {
      authStore.token = auth_token;
      authStore.user = jwt.decode(auth_token);
    }
    this.leavePage = this.leavePage.bind(this);
  }

  componentDidMount() {
    // window.addEventListener("beforeunload", this.leavePage);
  }

  componentWillUnmount() {
    // window.removelistener("beforeunload", this.leavePage);
  }

  leavePage(e) {
    const leaveMessage =
      "You are about to leave the MRI application platform. Please make sure to save your work and log out before leaving";
    e.returnValue = leaveMessage;
    return leaveMessage;
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
              <Messages />
              <Route exact path="/" component={UserIndex} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/users" component={UserIndex} />
              <Route path="/applications" component={FormsIndex} />
              <Route path="/bundles" component={BundlesIndex} />
            </Layout>
          </div>
        </Router>
      </StickyContainer>
    );
  }
}

export default App;
