import React from 'react';
import { Redirect } from 'react-router-dom';
import Form from 'react-jsonschema-form';
import SmallBox from '../common/smallBox';
import jwt from 'jsonwebtoken';
import { login } from '../../schema/user';
import { authStore, messages } from '../../lib/store.js';
import { getAuth } from '../../lib/api-calls.js';
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
      },
      loggedIn: false
    };
  }

  componentDidMount() {
    this.setState(state => ({
      loggedIn: authStore.token !== ''
    }));
  }

  async login({ formData }) {
    await getAuth('POST', '/users', JSON.stringify(formData)).then(data => {
      if (data) {
        authStore.token = data.token;
        authStore.user = jwt.decode(data.token);
        this.setState(() => ({ loggedIn: true }));
      } else {
        messages.messages.push({
          id: Math.random(),
          level: 'danger',
          message:
            'There was a problem logging in. Please check your email address or password.'
        });
      }
    });
  }

  errors({ errors }) {
    messages.messages.push({
      id: Math.Random(),
      message: 'There was an error logging in',
      level: 'error'
    });
    console.log(errors);
  }

  render() {
    if (this.state.loggedIn === true) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <SmallBox>
        <Form
          schema={login.schema}
          uiSchema={login.uiSchema}
          onSubmit={this.login}
          onError={this.errors}
          formData={this.state.formData}
          showErrorList={true}
          method="POST">
          <div className="form-actions form-group flex justify-end">
            <button type="submit">
              {login.schema.submitButton}
              <i className="fa fa-sign-in-alt ml2" />
            </button>
          </div>
        </Form>
      </SmallBox>
    );
  }
}

export default Login;
