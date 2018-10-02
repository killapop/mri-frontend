import React from 'react';
import PropTypes from 'prop-types';

class Clock extends React.Component {
  componentDidMount() {
    this.props.startClock();
  }

  componentWillUnmount() {
    this.props.stopClock();
  }

  render() {
    return <div className="clock">{this.props.clock}</div>;
  }
}

Clock.propTypes = {
  clock: PropTypes.string,
  startClock: PropTypes.func,
  stopClock: PropTypes.func
};

export default Clock;
