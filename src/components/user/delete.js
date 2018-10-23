import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import SmallBox from '../common/smallBox';
import { authStore, messages } from '../../lib/store';
import { apiCall } from '../../lib/api-calls';
import { view } from 'react-easy-state';

class DeleteUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleted: false
    };
    this.delete = this.delete.bind(this);
  }

  async delete() {
    await apiCall('DELETE', '/users/' + this.props.match.params.email, '', true)
      .then(statusCode => {
        console.log(statusCode);
        if (statusCode === 204) {
          this.setState(state => ({
            deleted: true
          }));
          messages.messages.push({
            id: Math.random(),
            message: `User account for ${
              this.props.match.params.email
            } has been deleted`,
            level: 'success'
          });
        } else {
          messages.messages.push({
            id: Math.random(),
            message: 'Error: There was an error deleting the account.',
            level: 'danger'
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (authStore.token === '') {
      return <Redirect to="/" />;
    }
    return (
      <SmallBox>
        {this.state.deleted ? (
          <div>
            <h4>
              Account for user - {this.props.match.params.email} has been
              deleted.{' '}
              <Link to="/dashboard">
                {' '}
                Click here to return to the dashboard{' '}
              </Link>
            </h4>
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
            <Link to="/dashboard">Cancel and return to the dashboard</Link>
          </div>
        )}
      </SmallBox>
    );
  }
}
export default view(DeleteUser);
