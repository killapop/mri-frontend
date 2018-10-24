import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { view } from 'react-easy-state';
import SmallBox from '../common/smallBox';
import { authStore, messages } from '../../lib/store';
import { apiCall } from '../../lib/api-calls';
import { add as addMessage } from '../../lib/message';

class InvalidateActivation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidated: false
    };
    this.invalidate = this.invalidate.bind(this);
  }

  async invalidate() {
    await apiCall(
      'PUT',
      '/activations/' + this.props.match.params.token,
      JSON.stringify({ isValid: false }),
      true
    )
      .then(statusCode => {
        if (statusCode === 204) {
          this.setState(state => ({
            invalidated: true
          }));
          addMessage(
            'success',
            `Activation for ${
              this.props.match.params.token
            } has been invalidated`
          );
        } else {
          addMessage(
            'danger',
            'There was an error invalidating the activation.'
          );
        }
      })
      .catch(err => {
        addMessage('danger', 'There was an error invalidating the activation.');
      });
  }

  render() {
    if (authStore.token === '') {
      return <Redirect to="/" />;
    }
    return (
      <SmallBox>
        {this.state.invalidated ? (
          <div>
            <h4>
              Activation with token {this.props.match.params.token} has been
              invalidated.{' '}
              <Link to="/dashboard">
                {' '}
                Click here to return to the dashboard{' '}
              </Link>
            </h4>
          </div>
        ) : (
          <div>
            <h3>
              Are you sure you want to invalidate the activation for token -{' '}
              {this.props.match.params.token}
            </h3>
            <input
              className="form-control"
              type="button"
              value="Yes. I am sure!"
              onClick={this.invalidate}
            />
            <Link to="/dashboard">Cancel and return to the dashboard</Link>
          </div>
        )}
      </SmallBox>
    );
  }
}
export default view(InvalidateActivation);
