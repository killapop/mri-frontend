import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { view } from '@risingstack/react-easy-state';

import CreateBundle from "./create";
import DeleteBundle from "./delete";
import Bundle from "./bundle";

import "../../assets/css/forms.css";

class BundlesIndex extends React.Component {
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
            path={`${this.props.match.url}/create`}
            component={CreateBundle}
          />
          <Route
            path={`${this.props.match.url}/delete/:id`}
            component={DeleteBundle}
          />
          <Route path={`${this.props.match.url}/:id`} component={Bundle} />
        </Switch>
      </div>
    );
  }
}

export default view(BundlesIndex);
