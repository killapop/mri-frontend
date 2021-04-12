/* eslint no-unused-vars: 0 */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import _ from "lodash";
import { view } from "@risingstack/react-easy-state";
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
          <nav className="ttu userNav flex justify-between mt3">
            <div className="info-link flex">
              <a className="flex flex-column items-center h-100 pv2">
                <i className={`fa fa-info mb2`} />
                <span className="dn db-l">Info</span>
              </a>

              <ul className="flex flex-column list">
                <li>
                  <a
                    rel="noopener noreferrer"
                    href="https://martin-roth-initiative.de"
                    target="_blank"
                    title="Info"
                    className="navLink h-100"
                  >
                    MRI website
                  </a>
                </li>
                <li>
                  <a
                    className="link black pr5 b"
                    href="https://martin-roth-initiative.de/en/imprint"
                    target="_blank"
                  >
                    Imprint
                  </a>
                </li>
                <li>
                  <a
                    className="link black pr3 b"
                    href="https://martin-roth-initiative.de/en/privacy"
                    target="_blank"
                  >
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
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
          </nav>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  sticky: PropTypes.bool,
};

export default Header;
