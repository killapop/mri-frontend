import React from 'react';
import './clock.css';

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
    // this.stopClock();
    window.clearInterval(this.clockTimer);
  }

  startClock() {
    this.clockTimer = window.setInterval(() => {
      let c = this.state.timer;
      const mid = c / 2;
      let r = 0,
        g = 0,
        b = 0,
        bgColor = '';

      if (c >= mid) {
        r = Math.floor(255 * (c / mid));
        g = 255;
      } else {
        r = 255;
        g = Math.floor((255 * (mid - ((c - 1) % mid))) / mid);
      }
      console.log(r, g, b);
      bgColor = 'rgba(' + r + ', ' + g + ', ' + b + ', 0.8)';

      c--;
      this.setState(state => ({
        timer: c,
        bgColor
      }));
    }, 1000);
  }

  stopClock() {
    window.clearInterval(this.clockTimer);
  }

  render() {
    const { timer } = this.state;
    return (
      <div className="clock">
        <div className="clock-title">time remaining</div>
        <div className="clock-timer">
          {new Date(timer * 1000).toISOString().substr(14, 5)}
          <i
            className="reset fa fa-sync pointer"
            alt="Refresh session"
            title="Refresh session"
          />
        </div>
      </div>
    );
  }
}

Clock.propTypes = {};

export default Clock;
