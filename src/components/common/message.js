import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { view } from 'react-easy-state';
import { messages } from '../../lib/store';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alive: true
    };
    this.dismiss = this.dismiss.bind(this);
  }

  dismiss(e) {
    this.setState(state => ({ alive: false }));
    _.remove(messages.messages, m => (m.id = this.props.message.id));
  }

  componentDidMount() {
    setTimeout(() => {
      this.dismiss();
    }, 5000);
  }

  render() {
    return (
      <div>
        {this.state.alive ? (
          <li
            id={this.props.message.id}
            className={`notification ${this.props.message.level}`}>
            <i className="fa fa-times-circle" onClick={this.dismiss} />
            {this.props.message.message}
          </li>
        ) : (
          ''
        )}
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object
};

export default view(Message);
