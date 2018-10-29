import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { view } from 'react-easy-state';
import Reactahead from 'reactahead';
import _ from 'lodash';
import SmallBox from '../common/smallBox';
import { authStore } from '../../lib/store';
import { apiCall } from '../../lib/api-calls';
import { add as addMessage } from '../../lib/message';

class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      created: false,
      users: [],
      selectedUser: ''
    };
    this.whichRole = this.whichRole.bind(this);
    this.change = this.change.bind(this);
    this.create = this.create.bind(this);
  }

  whichRole() {
    if (this.props.match.params.template === 'projectProposals') {
      return 'applicant';
    } else {
      return 'applicant';
    }
  }

  change(o, i) {
    document.getElementsByClassName('reactahead-input')[0].innerText = o;
    this.setState(state => ({ selectedUser: o }));
    this.my_reactahead.clearInput();
  }

  async componentDidMount() {
    await apiCall('GET', '/users', '', true)
      .then(users => {
        if (users) {
          const urs = _.map(
            _.filter(users, user => _.includes(user.roles, this.whichRole())),
            'email'
          );
          this.setState(state => ({ users: urs }));
        }
      })
      .catch(err => this.setState(state => ({ users: [] })));
  }

  async create(e) {
    await apiCall(
      'POST',
      '/applications',
      JSON.stringify({
        email: this.state.selectedUser,
        form: this.props.match.params.template + '.json'
      }),
      true
    ).then(data => {
      if (data === 204) {
        this.setState(state => ({ created: true }));
      } else {
        addMessage('danger', 'Error: There was an error creating the form');
      }
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
            <div>
              <h4 className="f4">
                A form was created for {this.state.selectedUser}.
              </h4>
              <p>
                <Link to="/dashboard">
                  Click here to return to the dashboard
                </Link>
              </p>
            </div>
          ) : (
            <div>
              <div className="form-group field field-object">
                <fieldset>
                  <legend id="root__title">Create Form</legend>
                  <div className="form-group field field-string">
                    <label className="control-label" htmlFor="root_email">
                      Create a form for <b>{this.state.selectedUser}</b>
                    </label>
                    <p
                      id="root_email__description"
                      className="field-description">
                      Enter the email address of the of the intended applicaant
                      (organisation or Beneficiary)
                    </p>
                    <Reactahead
                      api={api => (this.my_reactahead = api)}
                      noResultMsg="Found no users that match your search"
                      suggestions={this.state.users}
                      onSubmit={this.change}
                    />
                    <div />
                  </div>
                </fieldset>
                <div />
                <div />
              </div>
              <div className="form-actions form-group flex justify-end">
                <button type="submit" onClick={e => this.create(e)}>
                  Create form<i className="fa fa-plus-circle ml2" />
                </button>
              </div>
            </div>
          )}
        </div>
      </SmallBox>
    );
  }
}

export default view(CreateForm);
