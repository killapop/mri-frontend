import React from 'react';
import Form from 'react-jsonschema-form';
import { Redirect } from 'react-router-dom';
import { view } from 'react-easy-state';
import SmallBox from '../common/smallBox';
import { authStore } from '../../lib/store';
import { apiCall } from '../../lib/api-calls';
import { add as addMessage } from '../../lib/message';

import { change } from '../../schema/user';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      change: false,
      user: ''
    };
    this.change = this.change.bind(this);
    this.validate = this.validate.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
  }

  validate(formData, errors) {
    if (formData.pass1 !== formData.pass2) {
      errors.pass2.addError('Passwords do not match');
    }
    return errors;
  }

  async refreshToken() {
    await apiCall('POST', '/users/refresh', '', true).then(
      data => (authStore.token = data.token)
    );
  }

  async change({ formData }) {
    const body = {
      password: formData.pass1
    };

    await apiCall(
      'PUT',
      '/users/' + this.props.match.params.email,
      JSON.stringify(body),
      true
    )
      .then(result => {
        if (result === 204) {
          this.refreshToken();
        }
      })
      .then(result => {
        this.setState(state => ({
          change: true
        }));
        addMessage('success', 'Password successfully changed');
      })
      .catch(err => {
        addMessage(
          'danger',
          'There was an error while changing your password. Please try again later.'
        );
      });
  }

  render() {
    if (this.state.change || authStore.tokem === '') {
      return <Redirect to="/" />;
    }
    return (
      <SmallBox>
        <Form
          showErrorList={false}
          schema={change.schema}
          uiSchema={change.uiSchema}
          onSubmit={this.change}
          validate={this.validate}
          method="POST">
          <div className="form-actions form-group flex justify-end">
            <button type="submit">
              {change.schema.submitButton}
              <i className="fa fa-user-plus ml2" />
            </button>
          </div>
        </Form>
      </SmallBox>
    );
  }
}
export default view(ChangePassword);
