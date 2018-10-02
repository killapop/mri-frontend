import React from 'react';
import { Redirect } from 'react-router-dom';
import Form from 'react-jsonschema-form';
import { login } from '../../schema/user';
import { postOptions, baseURL, apiRoutes } from '../../lib/api-calls.js';
import '../../assets/css/forms.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.state = {
      formData: {
        email: 'mary@domain.com',
        password: 'secret'
      },
      authToken: '',
      loggedIn: false
    };
  }

  login({ formData, formErrors }) {
    Object.assign(postOptions, { body: JSON.stringify(formData) });
    console.log(postOptions.body);
    return fetch(baseURL + apiRoutes.auth, postOptions)
      .then(response => response.json())
      .then(result => {
        this.setState(state => ({
          authToken: result.data.token,
          loggedIn: true
        }));
        sessionStorage.setItem('activeUserState', 'loggedin');
      })
      .catch(err => console.log(err));
  }

  errors({ errors }) {
    console.log(errors);
  }

  render() {
    console.log(this.state.authToken, this.state.loggedIn);
    return (
      <div>
        {this.state.loggedIn ? (
          <Redirect to="/dashboard" />
        ) : (
          <div className="center small-box w-90 w-50-ns bg-very-very-light shadow-light pa4 mt6 ba b--very-ver-light ">
            <Form
              schema={login.schema}
              uiSchema={login.uiSchema}
              onSubmit={this.login}
              onError={this.errors}
              formData={this.state.formData}
              method="POST">
              <div className="form-group flex justify-end">
                <button type="submit">{login.schema.submitButton}</button>
              </div>
            </Form>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
