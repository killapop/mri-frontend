/* eslint no-unused-expresions: 0 */
import React from "react";
import { Redirect, Link } from "react-router-dom";
import _ from "lodash";
import { view } from "@risingstack/react-easy-state";
import Badges from "./badges";
import FacilitatorList from "./list";
import UserList from "./userList";
import { authStore } from "../../lib/store";

import "./dashboard.css";

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
      this.setState((state) => ({
        activeBadge: this.isStaff(),
      }));
    }
  }

  isStaff() {
    return _.includes(authStore.user.roles, "mri-staff");
  }

  badgeChangeHandler(e) {
    e.persist();
    this.setState((state) => ({ activeBadge: e.target.id }));
  }

  sluggify(s) {
    return s.replace(" ", "").toLowerCase();
  }

  render() {
    if (authStore.token === "") {
      return <Redirect to="/users/login" />;
    }
    const list = authStore.activeList;
    return (
      <div className="w-90 w-80-l center pa4-ns p3">
        <div className="title pb0 flex justify-start flex-column flex-row-l">
          Dashboard
          <div className="meta">Logged in as: {authStore.user.email}</div>
          <Link className="meta" to={`/users/password/${authStore.user.email}`}>
            <i className="fa fa-key" />
            Change password
          </Link>
        </div>
        {this.isStaff() ? <Badges /> : ""}
        {this.isStaff() ? <FacilitatorList list={list} /> : <UserList />}
      </div>
    );
  }
}

export default view(Dashboard);
