import React from 'react';
import Form from 'react-jsonschema-form';
import { Link } from 'react-router-dom';
import SmallBox from '../common/smallBox';
import { messages } from '../../lib/store';
import { baseURL, postOptions } from '../../lib/api-calls';

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

  activate({ formData }) {
    console.log(formData);
    const body = {
      // token: this.props.match.params.token,
      password: formData.password,
      account: {
        name: formData.name,
        password: formData.new_password
      }
    };
    Object.assign(postOptions, {
      headers: {
        Authorization: this.props.match.params.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    console.log(postOptions);
    return fetch(
      baseURL + '/activations/' + this.props.match.params.token,
      postOptions
    )
      .then(response => {
        if (response.status !== 401) {
          return response;
        } else {
          messages.messages.push({
            id: Math.random(),
            message: 'Error: There was an error add the user.',
            level: 'danger'
          });
        }
      })
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
