import React from 'react';
import PropTypes from 'prop-types';
import { view } from 'react-easy-state';
import { authStore } from '../../lib/store';

class Badge extends React.Component {
  constructor(props) {
    super(props);
    this.setActiveBadge = this.setActiveBadge.bind(this);
  }

  setActiveBadge(e) {
    authStore.activeList = e.target.id;
    console.log(authStore);
  }

  render() {
    const badge = this.props.badge;
    const slug = badge.title.replace(' ', '').toLowerCase();

    return (
      <div
        onClick={this.setActiveBadge}
        className={`badge pa3 flex flex-column justify-start items-center  pointer relative bg-light-gray mr3 ${
          authStore.activeList === slug ? 'active' : ''
        }`}
        id={slug}>
        <i className={`fa fa-${badge.icon} fa-3x mt3 mb1 gray`} />
        <div className="badgeValue">{this.props.size}</div>
        <div className="f4 gray t-shadow-light b">{this.props.badge.title}</div>
      </div>
    );
  }
}

Badge.propTypes = {
  badge: PropTypes.object.isRequired
};

export default view(Badge);
