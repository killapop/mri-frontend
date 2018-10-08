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
          <div className="center small-box w-90 w-50-ns bg-very-very-light shadow-light pa4 mt6 ba b--very-ver-light ">
            <Form schema={create.schema} uiSchema={create.uiSchema}>
              <div className="form-group flex justify-end">
                <button type="submit">{create.schema.submitButton}</button>
              </div>
            </Form>
          </div>
        )}
      </div>
    );
  }
}
export default CreateUser;
