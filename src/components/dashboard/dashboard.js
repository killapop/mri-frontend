/* eslint no-unused-expresions: 0 */
import React from 'react';
import _ from 'lodash';
import Badges from './badges';
import List from './list';
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
    return (
      <div>
        <div className=" w-80-ns center pa4">
          <div className="title">Dashboard - {authStore.currentRole}</div>
          {authStore.currentRole === 'facilitator' ? <Badges /> : ''}
        </div>
        {/* <List
            data={this.state.listData[this.sluggify(this.state.activeBadge)]}
            schema={
          this.state.listSchema[this.sluggify(this.state.activeBadge)]
            }
            title={this.state.activeBadge}
        /> */}
      </div>
    );
  }
}

export default view(Dashboard);
