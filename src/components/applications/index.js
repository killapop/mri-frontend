import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { view } from "@risingstack/react-easy-state";
import Application from "./application.js";
import DeleteApplication from "./delete";
import CreateForm from "./create";

import "../../assets/css/forms.css";

class ApplicationsIndex extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path={`${this.props.match.url}`}
            render={() => <Redirect to="/" />}
          />
          <Route
            exact
            path={`${this.props.match.url}/create/:template`}
            component={CreateForm}
          />
          <Route
            path={`${this.props.match.url}/delete/:id`}
            component={DeleteApplication}
          />
          <Route path={`${this.props.match.url}/:id`} component={Application} />
        </Switch>
      </div>
    );
  }
}

export default view(ApplicationsIndex);
