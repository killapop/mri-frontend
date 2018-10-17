import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { view } from 'react-easy-state';
import FormForm from './form';

import CreateForm from './create';

import '../../assets/css/forms.css';

class ApplicationsIndex extends React.Component {
  render() {
    return (
      <div>
        <Route
          exact
          path={`${this.props.match.url}`}
          render={() => <Redirect to="/" />}
        />
        <Route path={`${this.props.match.url}/create`} component={CreateForm} />
        <Route path={`${this.props.match.url}/edit/:id`} component={FormForm} />
      </div>
    );
  }
}

export default view(ApplicationsIndex);
