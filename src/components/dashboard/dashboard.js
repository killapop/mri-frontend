/* eslint no-unused-expresions: 0 */
import React from 'react';
import { Redirect } from 'react-router-dom';
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
  }

  componentDidMount() {
    if (authStore.currentRole) {
      this.setState(state => ({
        activeBadge: authStore.currentRole === 'facilitator' ? 'users' : 'forms'
      }));
    }
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
        {authStore.isLoggedIn ? (
          <div>
            <div className=" w-80-ns center pa4">
              <div className="title pb0">Dashboard</div>
              {authStore.currentRole === 'facilitator' ? <Badges /> : ''}
            </div>
            {authStore.currentRole === 'facilitator' ? (
              <FacilitatorList list={list} />
            ) : (
              <UserList />
            )}
          </div>
        ) : (
          <Redirect to="/" />
        )}
      </div>
    );
  }
}

export default view(Dashboard);
