import React from "react";
import { Route, Redirect } from "react-router-dom";
import { view } from '@risingstack/react-easy-state';

import Login from "./login";
import ChangePassword from "./changePassword";
import CreateUser from "./create";
import ActivateUser from "./activate";
import InvalidateActivation from "./invalidate";
import DeleteUser from "./delete";

import "../../assets/css/forms.css";

class UserIndex extends React.Component {
  render() {
    return (
      <div>
        <Route
          exact
          path={`${this.props.match.url}`}
          render={() => <Redirect to="/dashboard" />}
        />
        <Route path={`${this.props.match.url}/login`} component={Login} />
        <Route
          path={`${this.props.match.url}/password/:email`}
          component={ChangePassword}
        />
        <Route path={`${this.props.match.url}/create`} component={CreateUser} />
        <Route
          path={`${this.props.match.url}/activate/:token`}
          component={ActivateUser}
        />
        <Route
          path={`${this.props.match.url}/invalidate/:token`}
          component={InvalidateActivation}
        />
        <Route
          path={`${this.props.match.url}/delete/:email`}
          component={DeleteUser}
        />
      </div>
    );
  }
}

export default view(UserIndex);
