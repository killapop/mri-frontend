import React from 'react';
import PropTypes from 'prop-types';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alive: true
    };
    this.dismiss = this.dismiss.bind(this);
  }

  dismiss() {
    this.setState(state => ({ alive: false }));
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
          <li className={`notification ${this.props.message.level}`}>
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

export default Message;
