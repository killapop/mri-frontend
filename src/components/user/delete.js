import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { view } from 'react-easy-state';
import SmallBox from '../common/smallBox';
import { authStore } from '../../lib/store';
import { apiCall } from '../../lib/api-calls';
import _ from 'lodash';
import { add as addMessage } from '../../lib/message';

class DeleteUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: null,
      deleted: false
    };
    this.delete = this.delete.bind(this);
  }

  async componentDidMount() {
    const applications = await apiCall('GET', '/applications', '', true);
    this.setState(state => ({
      applications: applications.filter(
        application =>
          application.account.email === this.props.match.params.email
      ).length
    }));
    console.log(this.state.applications);
  }

  async delete() {
    await apiCall('DELETE', '/users/' + this.props.match.params.email, '', true)
      .then(statusCode => {
        if (statusCode === 204) {
          this.setState(state => ({
            deleted: true
          }));
          addMessage(
            'success',
            `User account for ${this.props.match.params.email} has been deleted`
          );
        } else {
          addMessage('danger', 'There was an error deleting the account.');
        }
      })
      .catch(err => {
        addMessage('danger', 'There was an error deleting the account.');
      });
  }

  render() {
    if (authStore.token === '' || this.state.deleted) {
      return <Redirect to="/" />;
    }
    return (
      <SmallBox>
        {this.state.applications ? (
          <div>
            <h3>
              The user {this.props.match.params.email} has{' '}
              {this.state.applications} application forms and cannot be deleted.
            </h3>
          </div>
        ) : (
          <div>
            <h3>
              Are you sure you want to delete the account for user -{' '}
              {this.props.match.params.email}
            </h3>
            <h3 className="red">
              {' '}
              Please note: This step cannot be reversed so proceed with caution.
            </h3>
            <input
              className="form-control"
              type="button"
              value="Yes. I am sure!"
              onClick={this.delete}
            />
          </div>
        )}
        <Link to="/dashboard">Cancel and return to the dashboard</Link>
      </SmallBox>
    );
  }
}
export default view(DeleteUser);
