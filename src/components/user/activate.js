import React from 'react';
import Form from 'react-jsonschema-form';
import SmallBox from '../common/smallBox';
import { messages } from '../../lib/store';
import { apiCall } from '../../lib/api-calls';

import { activate } from '../../schema/user';

class ActivateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activated: false,
      user: ''
    };
    this.activate = this.activate.bind(this);
  }

  async activate({ formData }) {
    const body = {
      password: formData.password,
      account: {
        name: formData.name,
        password: formData.new_password
      }
    };

    await apiCall(
      'POST',
      '/activations/' + this.props.match.params.token,
      JSON.stringify(body),
      false
    )
      .then(result => {
        console.log(result);
        if (result === 204) {
          this.setState(state => ({
            activated: true
          }));
          messages.messages.push({
            id: Math.random(),
            message: `Activation successful`,
            level: 'success'
          });
        }
      })
      .catch(err => {
        console.log(err);
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
