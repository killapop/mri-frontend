import React from 'react';
import { authStore } from '../../lib/store';
import { apiCall } from '../../lib/api-calls';
import { add as addMessage } from '../../lib/message';
import './clock.css';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 0
    };
    this.startClock = this.startClock.bind(this);
    this.stopClock = this.stopClock.bind(this);
    this.resetSession = this.resetSession.bind(this);
  }

  componentDidMount() {
    this.resetSession('new');
    this.startClock();
  }

  componentWillUnmount() {
    window.clearInterval(this.clockTimer);
  }

  async resetSession(type) {
    await apiCall('POST', '/users/refresh', '', true)
      .then(data => {
        window.clearInterval(this.clockTimer);
        this.setState(state => ({ timer: 3600 }));
        authStore.token = data.token;
        if (type !== 'new') {
          addMessage('success', 'Your session has been reset');
        }
        this.startClock();
      })
      .catch(err => {
        addMessage(
          'warning',
          'Your session will expire soon. Please click the refresh button at the clock to refresh it.'
        );
        console.log(err);
      });
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
            onClick={this.resetSession}
          />
        </div>
      </div>
    );
  }
}

Clock.propTypes = {};

export default Clock;
