import React from 'react';
import Form from 'react-jsonschema-form';
import { Redirect } from 'react-router-dom';
import { view } from 'react-easy-state';
import SmallBox from '../common/smallBox';
import { authStore, messages } from '../../lib/store';
import { baseURL, postOptions } from '../../lib/api-calls';

import { create } from '../../schema/user';

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      created: false,
      user: ''
    };
    this.create = this.create.bind(this);
  }

  create({ formData }) {
    console.log(formData);

    Object.assign(postOptions, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authStore.token
      },
      body: JSON.stringify(formData)
    });
    console.log(postOptions);
    return fetch(baseURL + '/activations', postOptions)
      .then(response => {
        if (response.status !== 401) {
          return response.json();
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
        if (result.data) {
          this.setState(state => ({
            user: result.data,
            created: true
          }));
          messages.messages.push({
            id: Math.random(),
            message: `Logged in as ${formData.email}`,
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
        {!authStore.isLoggedIn ? (
          <Redirect to="/" />
        ) : (
          <div>
            {this.state.created ? (
              <div>
                <p>
                  A new user account has been created for{' '}
                  {this.state.user.email}.
                </p>
                <p>
                  {' '}
                  To activate the account, the user has to open this link in a
                  browser: http://devs:3000/user/activate/{
                    this.state.user.token
                  }.
                </p>
                <p>
                  The password for activation is: {this.state.user.password}
                </p>
              </div>
            ) : (
              <Form
                schema={create.schema}
                uiSchema={create.uiSchema}
                onSubmit={this.create}
                method="POST">
                <div className="form-actions form-group flex justify-end">
                  <button type="submit">
                    {create.schema.submitButton}
                    <i className="fa fa-user-plus ml2" />
                  </button>
                </div>
              </Form>
            )}
          </div>
        )}
      </SmallBox>
    );
  }
}
export default view(CreateUser);
