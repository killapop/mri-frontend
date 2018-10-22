/* eslint no-unused-vars: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import logo from '../../assets/images/logo.svg';
// import TestValues from '../common/testValues';
import { messages, authStore } from '../../lib/store';
import { view } from 'react-easy-state';
import { userLinks, sessionFilters } from '../../data/testData';
import Clock from '../common/clock';
import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.roleChangeHandler = this.roleChangeHandler.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      activeState: '',
      navOpen: true,
      userLinks,
      sessionFilters,
      activeRole: authStore.currentRole
    };
  }

  logout() {
    authStore.isLoggedIn = false;
    authStore.token = '';
    messages.messages.push({ message: 'logged out', level: 'success' });
  }

  roleChangeHandler(e) {
    const id = e.target.id;
    const filtertype = e.target.dataset.filtertype;
    e.persist();
    authStore.currentRole = authStore.currentRole === id ? '' : id;
    this.setState(state => ({ [filtertype]: id }));
  }

  componentDidMount() {
    this.setState(state => ({
      activeState: '/' + window.location.pathname.split('/')[1]
    }));
  }

  render() {
    const { sticky } = this.props;
    return (
      <div>
        <div
          className={`header ${
            sticky ? 'sticky' : ''
          } ph2 w-100 flex justify-between`}>
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
                className="navLink pv2 h-100">
                <div className="flex items-center">
                  <i className={`fa fa-info mb2`} />
                  <span className="dn db-l">Info</span>
                </div>
              </a>
              {authStore.token !== '' ? (
                <div className="flex">
                  {this.state.userLinks.map(({ label, Icon, path }, key) => (
                    <Link
                      key={key}
                      to={path}
                      title={label}
                      id={label.toLowerCase().replace(' ', '')}
                      data-path={path}
                      className={`navLink pv2 h-100 ${
                        window.location.pathname.split('/')[1] ===
                        path.split('/')[1]
                          ? 'active'
                          : ''
                      }`}>
                      <div className="flex items-center">
                        <i className={`fa fa-${Icon} mb2`} />
                        <span className=" dn db-l">{label}</span>
                      </div>
                    </Link>
                  ))}
                  <Link
                    to="#"
                    title="Logout"
                    className="navLink pv2 h-100"
                    onClick={this.logout}>
                    <div className="flex items-center">
                      <i className="fa fa-sign-out-alt mb2" />
                      <span className="dn db-l">Logout</span>
                    </div>
                  </Link>
                  <Clock />
                </div>
              ) : (
                ''
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
