import React from 'react';
import Form from 'react-jsonschema-form';
import { Redirect, Link } from 'react-router-dom';
import { view } from 'react-easy-state';
import SmallBox from '../common/smallBox';
import { authStore, messages } from '../../lib/store';
import { apiCall } from '../../lib/api-calls';

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

  async create({ formData }) {
    await apiCall('POST', '/activations', JSON.stringify(formData))
      .then(result => {
        console.log(result);
        if (result) {
          this.setState(state => ({
            user: result,
            created: true
          }));
          messages.messages.push({
            id: Math.random(),
            message: `Created a user account for ${formData.email}`,
            level: 'success'
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (authStore.token === '') {
      return <Redirect to="/" />;
    }
    return (
      <SmallBox>
        <div>
          {this.state.created ? (
            <div className="bg-white pv4 ph3 ba b--light-silver">
              <div className="title">Account created</div>
              <div className="f4 mb4">
                A new activation has been created for {this.state.user.email}.
              </div>
              <div className="mb3">
                <label>URL: </label>
                <p>
                  {`${window.location.origin}/users/activate/${
                    this.state.user.token
                  }`}
                </p>
              </div>
              <div>
                <label>password: </label>
                <p>{this.state.user.password}</p>
              </div>
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
      </SmallBox>
    );
  }
}
export default view(CreateUser);
