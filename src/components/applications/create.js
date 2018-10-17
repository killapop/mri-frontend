import React from 'react';
import Form from 'react-jsonschema-form';
import { Redirect, Link } from 'react-router-dom';
import { view } from 'react-easy-state';
import SmallBox from '../common/smallBox';
import { authStore } from '../../lib/store';
import { create } from '../../schema/forms';

class CreateForm extends React.Component {
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
        {!authStore.isLoggedIn ? (
          <Redirect to="/" />
        ) : (
          <div>
            {this.state.created ? (
              <div>
                An form was created for {this.state.user}. <br />
                <br />The unique url to the form is{`  `}
                <Link
                  to={`/forms/edit/${Math.random()
                    .toString(36)
                    .substring(2)}`}>
                  here
                </Link>
              </div>
            ) : (
              <Form
                schema={create.schema}
                uiSchema={create.uiSchema}
                showErrorList={true}
                method="POST"
                onSubmit={this.create}>
                <div className="form-actions form-group flex justify-end">
                  <button type="submit">
                    {create.schema.submitButton}
                    <i className="fa fa-plus-circle ml2" />
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

export default view(CreateForm);
