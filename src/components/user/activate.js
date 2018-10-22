import React from 'react';
import Form from 'react-jsonschema-form';
import { Link } from 'react-router-dom';
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
      // token: this.props.match.params.token,
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
        if (result) {
          this.setState(state => ({
            activated: true
          }));
          messages.messages.push({
            id: Math.random(),
            message: `Success! account for ${
              formData.email
            } has been activated`,
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
            <h1> Your account has been activated</h1>
            <Link to="/user/login">login now</Link>
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
