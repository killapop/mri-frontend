import React from 'react';
import Form from 'react-jsonschema-form';
import { Redirect } from 'react-router-dom';
import { authStore } from '../../lib/store';
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
    this.setState(state => ({
      created: true,
      user: formData.email
    }));
  }

  render() {
    return (
      <div>
        {!authStore.isLoggedIn ? (
          <Redirect to="/" />
        ) : (
          <div>
            {this.state.created ? (
              <div className="center small-box w-90 w-100 bg-very-very-light shadow-light pa4 mt6 ba b--very-ver-light ">
                An account was created for {this.state.user}. <br />
                <br />The activatition url is
                https://mri-appplication.de/user/activate/{Math.random()
                  .toString(36)
                  .substring(2)}
                <br />
                <br />The temporary password to use at the time of activation
                is: &nbsp;
                {Math.random()
                  .toString(30)
                  .substring(2)}
              </div>
            ) : (
              <div className="center small-box w-90 w-50-ns bg-very-very-light shadow-light pa4 mt6 ba b--very-ver-light ">
                <Form
                  schema={create.schema}
                  uiSchema={create.uiSchema}
                  showErrorList={true}
                  method="POST"
                  onSubmit={this.create}>
                  <div className="form-group flex justify-end">
                    <button type="submit">{create.schema.submitButton}</button>
                  </div>
                </Form>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default CreateUser;
