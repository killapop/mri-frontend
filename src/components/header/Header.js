/* eslint no-unused-vars: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import logo from '../../assets/images/logo.svg';
// import TestValues from '../common/testValues';
import { authStore } from '../../lib/store';
import { view } from 'react-easy-state';
import { userLinks, sessionFilters } from '../../data/testData';
import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.roleChangeHandler = this.roleChangeHandler.bind(this);
    this.state = {
      activeState: '',
      navOpen: true,
      userLinks,
      sessionFilters,
      activeRole: authStore.currentRole
    };
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
        <div className={`header ${sticky ? 'sticky' : ''} ph2 w-100 flex`}>
          <Link to="/" className="logo pa2">
            <img src={logo} alt="Martin Roth-Initiative" />
          </Link>
          <nav className="ttu flex justify-between mt3">
            <div className="userNav flex justify-start h-100 items-start">
              {this.state.userLinks.map(({ label, Icon, path }, key) => (
                <Link
                  key={key}
                  to={path}
                  id={label.toLowerCase().replace(' ', '')}
                  data-path={path}
                  className={`navLink pv2 h-100 ${
                    window.location.pathname.split('/')[1] ===
                    path.split('/')[1]
                      ? 'active'
                      : ''
                  }`}>
                  <div className="flex f6 items-center">
                    <i className={`fa fa-${Icon} mb2 fa-2x`} />
                    <span className="f7">{label}</span>
                  </div>
                </Link>
              ))}
              <a
                rel="noopener noreferrer"
                href="https://martin-roth-initiative.de"
                target="_blank"
                className="navLink pv2 h-100">
                <div className="flex f6 items-center">
                  <i className={`fa fa-info mb2 fa-2x`} />
                  <span className="f7">Info</span>
                </div>
              </a>
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
