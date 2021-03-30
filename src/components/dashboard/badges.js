import React from "react";
import _ from "lodash";
import { view } from "@risingstack/react-easy-state";
import Badge from "./badge";

class Badges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      badges: [
        { title: "Activations", icon: "user-check" },
        {
          title: "Users",
          icon: "users"
        },
        {
          title: "Project proposals",
          icon: "project-diagram"
        },
        {
          title: "Personal statements",
          icon: "id-card-alt"
        },
        {
          title: "Bundles",
          icon: "cubes"
        }
      ]
    };
  }
  render() {
    return (
      <div className="badges flex flex-wrap justify-between">
        {_.map(this.state.badges, (badge, idx) => (
          <Badge badge={badge} key={idx} />
        ))}
      </div>
    );
  }
}

export default view(Badges);
