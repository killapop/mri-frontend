import React from 'react';
import Form from 'react-jsonschema-form';
import { Redirect, Link } from 'react-router-dom';
import { view } from 'react-easy-state';
// import _ from 'lodash';
import SmallBox from '../common/smallBox';
import { authStore } from '../../lib/store';
import { apiCall } from '../../lib/api-calls';
import { add as addMessage } from '../../lib/message';

class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      created: false,
      users: []
    };
    this.create = this.create.bind(this);
  }

  // async componentDidMount() {
  //   apiCall('GET', '/users', '', true)
  //     .then(users => {
  //       if (users) {
  //         this.setState(state => ({
  //           users: _.map(users, user => _.includes('applicant', user.roles))
  //         }));
  //       }
  //     })
  //     .catch(err => this.setState(state => ({ users: [] })));
  // }
  // // TODO: make the email dropdown an autocomplete from all users with applicant role.

  async create({ formData }) {
    Object.assign(formData, {
      form: this.props.match.params.template + '.json'
    });
    await apiCall('POST', '/applications', JSON.stringify(formData), true).then(
      data => {
        if (data === 204) {
          this.setState(state => ({ created: true }));
        } else {
          addMessage('danger', 'Error: There was an error creating the form');
        }
      }
    );
  }

  render() {
    const schema = {
      title: 'Create Form',
      type: 'object',
      required: ['email'],
      submitButton: 'Create form',
      cancelButton: 'Cancel',
      properties: {
        email: {
          type: 'string',
          title: 'Create a form for'
        }
      }
    };
    const uiSchema = {
      email: {
        'ui:widget': 'email',
        'ui:autofocus': true,
        'ui:description':
          'Enter the email address of the of the intended applicaant (organisation or Beneficiary)'
      }
    };

    if (authStore.token === '') {
      return <Redirect to="/" />;
    }
    return (
      <SmallBox>
        <div>
          {this.state.created ? (
            <div>
              A form was created for {this.state.user}. <br />
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
              schema={schema}
              uiSchema={uiSchema}
              showErrorList={true}
              method="POST"
              onSubmit={this.create}>
              <div className="form-actions form-group flex justify-end">
                <button type="submit">
                  {schema.submitButton}
                  <i className="fa fa-plus-circle ml2" />
                </button>
              </div>
            </Form>
          )}
        </div>
      </SmallBox>
    );
  }
}

export default view(CreateForm);
