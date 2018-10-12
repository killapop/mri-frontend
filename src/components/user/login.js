import React from 'react';
import { Redirect } from 'react-router-dom';
import Form from 'react-jsonschema-form';
import { login } from '../../schema/user';
import { view } from 'react-easy-state';
import { authStore, messages } from '../../lib/store.js';
import { postOptions, baseURL, apiRoutes } from '../../lib/api-calls.js';
import '../../assets/css/forms.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.errors = this.errors.bind(this);
    this.state = {
      formData: {
        email: 'mary@domain.com',
        password: 'secretsecret'
      }
    };
  }

  login({ formData }) {
    Object.assign(postOptions, { body: JSON.stringify(formData) });
    return fetch(baseURL + apiRoutes.auth, postOptions)
      .then(response => {
        if (response.status !== 401) {
          return response.json();
        } else {
          messages.messages.push({
            id: Math.random(),
            message: 'Error: Please check the email or password',
            level: 'danger'
          });
        }
      })
      .then(result => {
        if (result.data) {
          authStore.isLoggedIn = true;
          authStore.token = result.data.token;
          // TODO: fetch actual roles.
          if (formData.email === 'mary@domain.com') {
            authStore.currentRole = 'facilitator';
          } else {
            authStore.currentRole = 'organisation';
          }
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

  errors({ errors }) {
    messages.messages.push({
      id: Math.Random(),
      message: 'There was an error submitting the form',
      level: 'error'
    });
    console.log(errors);
  }

  render() {
    return (
      <div className="center small-box w-90 w-50-l">
        {authStore.isLoggedIn ? (
          <Redirect to="/dashboard" />
        ) : (
          <Form
            schema={login.schema}
            uiSchema={login.uiSchema}
            onSubmit={this.login}
            onError={this.errors}
            formData={this.state.formData}
            showErrorList={true}
            method="POST">
            <div className="form-group flex justify-end">
              <button type="submit">{login.schema.submitButton}</button>
            </div>
          </Form>
        )}
      </div>
    );
  }
}

export default view(Login);
