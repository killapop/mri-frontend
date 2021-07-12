import React from "react";
import _ from "lodash";
import { withTranslation } from "react-i18next";
import { view } from "@risingstack/react-easy-state";
import Badge from "./badge";

class Badges extends React.Component {
  render() {
    const { t } = this.props;
    const badges = [
      {
        title: t("dashboard_badge_activations"),
        icon: "user-check",
        slug: "activations",
      },
      {
        title: t("dashboard_badge_users"),
        icon: "users",
        slug: "users",
      },
      {
        title: t("dashboard_badge_proposals"),
        icon: "project-diagram",
        slug: "projectProposals",
      },
      {
        title: t("dashboard_badge_statements"),
        icon: "id-card-alt",
        slug: "personalStatements",
      },
      {
        title: t("dashboard_badge_bundles"),
        icon: "cubes",
        slug: "bundles",
      },
    ];
    return (
      <div className="badges flex flex-wrap justify-between">
        {_.map(badges, (badge, idx) => (
          <Badge badge={badge} key={idx} />
        ))}
      </div>
    );
  }
}

export default withTranslation()(view(Badges));
