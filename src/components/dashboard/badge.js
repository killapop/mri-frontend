import React from "react";
import PropTypes from "prop-types";
import { view } from "@risingstack/react-easy-state";
import { authStore } from "../../lib/store";

class Badge extends React.Component {
  constructor(props) {
    super(props);
    this.setActiveBadge = this.setActiveBadge.bind(this);
  }

  setActiveBadge(e) {
    const dataset = e.target.dataset;
    authStore.activeList.title = dataset.title;
    authStore.activeList.slug = dataset.slug;
    window.sessionStorage.activeTitle = dataset.title;
    window.sessionStorage.activeList = dataset.slug;
  }

  render() {
    const { badge } = this.props;
    return (
      <div
        onClick={this.setActiveBadge}
        className={`badge flex flex-column justify-center items-center  pointer relative ${
          authStore.activeList.slug === badge.slug ? "active" : ""
        }`}
        data-slug={badge.slug}
        data-title={badge.title}
        id={badge.slug}
      >
        <i className={`fa fa-${badge.icon} mb3`} />
        <div className="badge-title f6 ttu t-shadow-light">{badge.title}</div>
      </div>
    );
  }
}

Badge.propTypes = {
  badge: PropTypes.object.isRequired,
};

export default view(Badge);
