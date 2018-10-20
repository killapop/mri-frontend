import React from 'react';
import { Link } from 'react-router-dom';
import SmallBox from '../common/smallBox';
import { authStore, messages } from '../../lib/store';
import { baseURL } from '../../lib/api-calls';
import { view } from 'react-easy-state';

class InvalidateActivation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidated: false
    };
    this.invalidate = this.invalidate.bind(this);
  }

  invalidate() {
    const body = {
      isValid: false
    };
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authStore.token
      },
      body: JSON.stringify(body)
    };
    return fetch(
      baseURL + '/activations/' + this.props.match.params.token,
      options
    )
      .then(response => {
        console.log(response.status);
        if (response.status === 204) {
          this.setState(state => ({
            invalidated: true
          }));
          messages.messages.push({
            id: Math.random(),
            message: `Activation for ${
              this.props.match.params.token
            } has been invalidated`,
            level: 'success'
          });
        } else {
          messages.messages.push({
            id: Math.random(),
            message: 'Error: There was an error add the user.',
            level: 'danger'
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <SmallBox>
        {this.state.invalidated ? (
          <div>
            <h4>
              Activation with token {this.props.match.params.token} has been
              invalidated.{' '}
              <Link to="/dashboard">
                {' '}
                Click here to return to the bashboard{' '}
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
            <Link to="/dashboard">Cancel and to back</Link>
          </div>
        )}
      </SmallBox>
    );
  }
}
export default view(InvalidateActivation);
