/* eslint no-unused-vars: 0 */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import _ from "lodash";
import { view } from "react-easy-state";
import logo from "../../assets/images/logo.svg";
import Clock from "../common/clock";
import { messages, authStore } from "../../lib/store";
import { add as addMessage } from "../../lib/message";
import "./Header.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    authStore.isLoggedIn = false;
    authStore.token = "";
    addMessage("info", "Logged out");
    window.sessionStorage.clear();
  }

  render() {
    const { sticky } = this.props;
    return (
      <div>
        <div
          className={`header ${
            sticky ? "sticky" : ""
          } ph2 w-100 flex justify-between`}
        >
          <Link to="/" className="logo pa2">
            <img src={logo} alt="Martin Roth-Initiative" />
          </Link>
          <nav className="ttu flex justify-between mt3">
            <div className="userNav flex justify-start h-100 items-start">
              <a
                rel="noopener noreferrer"
                href="https://martin-roth-initiative.de"
                target="_blank"
                title="Info"
                className="navLink pv2 h-100"
              >
                <div className="flex items-center">
                  <i className={`fa fa-info mb2`} />
                  <span className="dn db-l">Info</span>
                </div>
              </a>
              {authStore.token !== "" ? (
                <div className="flex">
                  <Link
                    to="/dashboard"
                    title="Dashboard"
                    className={`navLink pv2 h-100
                      ${
                        window.location.pathname.indexOf("dashboard") !== -1
                          ? "active"
                          : ""
                      }`}
                  >
                    <div className="flex items-center">
                      <i className="fa fa-tachometer-alt mb2" />
                      <span className="dn db-l">Dashboard</span>
                    </div>
                  </Link>
                  <Link
                    to="#"
                    title="Logout"
                    className="navLink pv2 h-100"
                    onClick={this.logout}
                  >
                    <div className="flex items-center">
                      <i className="fa fa-sign-out-alt mb2" />
                      <span className="dn db-l">Logout</span>
                    </div>
                  </Link>
                </div>
              ) : (
                ""
              )}
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  sticky: PropTypes.bool
};

export default Header;
