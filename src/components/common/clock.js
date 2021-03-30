import React from "react";
import { authStore } from "../../lib/store";
import { apiCall } from "../../lib/api-calls";
import { add as addMessage } from "../../lib/message";
import "./clock.css";

function ResetNotice(props) {
  return (
    <div className="reset-notice b-black">
      <div className="overlay">
        <div className="reset-content">
          <h4>
            Your session will soon expire. Please refresh your session to
            continue filling in the form without losing any data.
          </h4>
          <div className="hint">
            Please remember to frequently save and continue while filling in the
            form
          </div>
          <div className="reset-actions flex justify-end">
            <button onClick={props.closeResetNotice}>Cancel</button>
            <div className="reset-action" onClick={props.resetSession}>
              <i
                className="reset fa fa-sync"
                alt="Refresh session"
                title="Refresh session"
              />{" "}
              <span>Refresh your session now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 0,
      showResetNotice: false,
      canCancel: true,
    };
    this.startClock = this.startClock.bind(this);
    this.stopClock = this.stopClock.bind(this);
    this.resetSession = this.resetSession.bind(this);
    this.closeResetNotice = this.closeResetNotice.bind(this);
  }

  componentDidMount() {
    this.resetSession("new");
    this.startClock();
  }

  UNSAFE_componentWillUnmount() {
    window.clearInterval(this.clockTimer);
  }

  async resetSession(type) {
    await apiCall("POST", "/users/refresh", "", true)
      .then((data) => {
        window.clearInterval(this.clockTimer);
        this.setState((state) => ({
          timer: 3600,
          showResetNotice: false,
          canCancel: true,
        }));
        authStore.token = data.token;
        if (type !== "new") {
          addMessage("success", "Your session has been reset");
        }
        this.startClock();
      })
      .catch((err) => {
        addMessage(
          "warning",
          "Your session will expire soon. Please click the refresh button at the clock to refresh it."
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
        bgColor = "";

      if (c >= mid) {
        r = Math.floor(255 * (c / mid));
        g = 255;
      } else {
        r = 255;
        g = Math.floor((255 * (mid - ((c - 1) % mid))) / mid);
      }
      bgColor = "rgba(" + r + ", " + g + ", " + b + ", 0.8)";

      c--;
      this.setState((state) => ({
        timer: c,
        bgColor,
      }));

      if (c < 600) {
        console.log(`${c} seconds remaining`);
        if (this.state.canCancel) {
          this.setState({ showResetNotice: true });
        }
      }
    }, 1000);
  }

  stopClock() {
    window.clearInterval(this.clockTimer);
  }

  closeResetNotice() {
    this.setState({ showResetNotice: false, canCancel: false });
  }

  render() {
    const { timer, showResetNotice } = this.state;
    return (
      <div className="clock">
        {showResetNotice ? (
          <ResetNotice
            resetSession={this.resetSession}
            closeResetNotice={this.closeResetNotice}
          />
        ) : (
          ""
        )}
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
