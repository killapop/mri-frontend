import React from "react";
import { Redirect, Link } from "react-router-dom";
import _ from "lodash";
import { withTranslation } from "react-i18next";
import Badges from "./badges";
import FacilitatorList from "./list";
import UserList from "./userList";
import { authStore } from "../../lib/store";
import { view } from "@risingstack/react-easy-state";
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
      this.setState({
        activeBadge: this.isStaff(),
      });
    }
  }

  isStaff() {
    return _.includes(authStore.user.roles, "mri-staff");
  }

  badgeChangeHandler(e) {
    e.persist();
    this.setState({ activeBadge: e.target.id });
  }

  sluggify(s) {
    return s.replace(" ", "").toLowerCase();
  }

  render() {
    const { t } = this.props;
    if (authStore.token === "") {
      return <Redirect to="/users/login" />;
    }
    const list = authStore.activeList;
    return (
      <div className="w-90 w-80-l center pa4-ns p3">
        <div className="title pb0 flex justify-start flex-column flex-row-l">
          {t("navbar_dashboard")}
          <div className="meta">
            {t("dashboard_logged_in_as", { who: authStore.user.email })}
          </div>
          <Link className="meta" to={`/users/password/${authStore.user.email}`}>
            <i className="fa fa-key" />
            {t("dashboard_change_password")}
          </Link>
        </div>
        {this.isStaff() ? <Badges /> : ""}
        {this.isStaff() ? <FacilitatorList list={list} /> : <UserList />}
      </div>
    );
  }
}

export default withTranslation()(view(Dashboard));
