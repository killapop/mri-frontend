import React from 'react';
import Form from 'react-jsonschema-form';
import SmallBox from '../common/smallBox';
import { apiCall } from '../../lib/api-calls';
import { add as addMessage } from '../../lib/message';

import { activate } from '../../schema/user';

class ActivateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activated: false,
      user: ''
    };
    this.activate = this.activate.bind(this);
    this.validate = this.validate.bind(this);
  }

  validate(formData, errors) {
    if (formData.pass1 !== formData.pass2) {
      errors.pass2.addError("Passwords don't match");
    }
    return errors;
  }

  async activate({ formData }) {
    const body = {
      password: formData.password,
      account: {
        name: formData.name,
        password: formData.pass1
      }
    };

    await apiCall(
      'POST',
      '/activations/' + this.props.match.params.token,
      JSON.stringify(body),
      false
    )
      .then(result => {
        if (result === 204) {
          this.setState(state => ({
            activated: true
          }));
          addMessage('success', 'Activation successful');
        }
      })
      .catch(err => {
        addMessage(
          'warning',
          'Something went wrong while activating this account. Please ensure the data you entered is correct'
        );
      });
  }

  render() {
    return (
      <SmallBox>
        {this.state.activated ? (
          <div>
            <h1>Activated!</h1>
            <div className="f4">
              Your account has been activated.
              <a href="/">login now</a>
            </div>
          </div>
        ) : (
          <Form
            schema={activate.schema}
            uiSchema={activate.uiSchema}
            onSubmit={this.activate}
            validate={this.validate}
            method="POST">
            <div className="form-actions form-group flex justify-end">
              <button type="submit">
                {activate.schema.submitButton}
                <i className="fa fa-user-plus ml2" />
              </button>
            </div>
          </Form>
        )}
      </SmallBox>
    );
  }
}
export default ActivateUser;
