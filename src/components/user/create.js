import React from 'react';
import Form from 'react-jsonschema-form';
import { Redirect } from 'react-router-dom';
import SmallBox from '../common/smallBox';
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
      <SmallBox>
        {authStore.isLoggedIn ? (
          <Form schema={create.schema} uiSchema={create.uiSchema}>
            <div className="form-actions form-group flex justify-end">
              <button type="submit">
                {create.schema.submitButton}
                <i className="fa fa-user-plus ml2" />
              </button>
            </div>
          </Form>
        ) : (
          <Redirect to="/" />
        )}
      </SmallBox>
    );
  }
}
export default CreateUser;
