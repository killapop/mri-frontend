import React from 'react';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 3600
    };
    this.startClock = this.startClock.bind(this);
    this.stopClock = this.stopClock.bind(this);
  }

  componentDidMount() {
    this.startClock();
  }

  componentWillUnmount() {
    this.stopClock();
  }

  startClock() {
    this.clockTimer = window.setInterval(() => {
      let c = this.state.timer;
      c--;
      this.setState(state => ({
        timer: c
      }));
    }, 1000);
  }

  stopClock() {
    this.setState(state => ({ timer: 3600 }));
    window.clearInterval(this.clockTimer);
  }

  render() {
    const { timer } = this.state;
    return (
      <div className="clock">
        {new Date(timer * 1000).toISOString().substr(14, 5)}
      </div>
    );
  }
}

Clock.propTypes = {};

export default Clock;
