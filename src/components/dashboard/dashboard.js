/* eslint no-unused-expresions: 0 */
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import _ from 'lodash';
import Badges from './badges';
import FacilitatorList from './list';
import UserList from './userList';
import { authStore } from '../../lib/store';
import { view } from 'react-easy-state';
import './dashboard.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    // this.badges = this.badges.bind(this);
    this.badgeChangeHandler = this.badgeChangeHandler.bind(this);
    this.sluggify = this.sluggify.bind(this);
    this.isStaff = this.isStaff.bind(this);
  }

  componentDidMount() {
    if (authStore.currentRole) {
      this.setState(state => ({
        activeBadge: this.isStaff()
      }));
    }
  }

  isStaff() {
    return _.includes(authStore.user.roles, 'mri-staff');
  }

  badgeChangeHandler(e) {
    e.persist();
    this.setState(state => ({ activeBadge: e.target.id }));
  }

  sluggify(s) {
    return s.replace(' ', '').toLowerCase();
  }

  render() {
    const list = authStore.activeList;
    return (
      <div>
        {authStore.token !== '' ? (
          <div>
            <div className=" w-80-ns center pa4">
              <div className="title pb0 flex justify-start">
                Dashboard
                <div className="meta">Logged in as: {authStore.user.email}</div>
                <Link
                  className="meta"
                  to={`/users/password/${authStore.user.email}`}>
                  <i className="fa fa-key" />Change password
                </Link>
              </div>
              {this.isStaff() ? <Badges /> : ''}
            </div>
            {this.isStaff() ? <FacilitatorList list={list} /> : <UserList />}
          </div>
        ) : (
          <Redirect to="/" />
        )}
      </div>
    );
  }
}

export default view(Dashboard);
