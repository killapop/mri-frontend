import React from "react";
import { withTranslation } from "react-i18next";
import i18n from "../../i18n.js";
import { authStore } from "../../lib/store";
import { apiCall } from "../../lib/api-calls";
import { add as addMessage } from "../../lib/message";
import "./clock.css";

function ResetNotice(props) {
  console.log(props);
  const { t } = this.props;
  return (
    <div className="reset-notice b-black">
      <div className="overlay">
        <div className="reset-content">
          <h4>{t("clock_resetNotice_title")}</h4>
          <div className="hint">{t("clock_resetNotice_help")}</div>
          <div className="reset-actions flex justify-end">
            <button onClick={props.closeResetNotice}>
              {t("common_cancel")}
            </button>
            <div className="reset-action" onClick={props.resetSession}>
              <i
                className="reset fa fa-sync"
                alt={t("clock_refresh_alt")}
                title={t("clock_refresh_alt")}
              />{" "}
              <span>{t("clock_refresh_button")}</span>
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
        this.setState({
          timer: 3600,
          showResetNotice: false,
          canCancel: true,
        });
        authStore.token = data.token;
        if (type !== "new") {
          addMessage("success", i18n.t("message_refresh_confirmation"));
        }
        this.startClock();
      })
      .catch((err) => {
        addMessage("warning", i18n.t("message_refresh_error"));
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
      this.setState({
        timer: c,
        bgColor,
      });

      if (c < 600) {
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
    const { t } = this.props;
    return (
      <div className="clock">
        {showResetNotice ? (
          <ResetNotice
            t={t}
            resetSession={this.resetSession}
            closeResetNotice={this.closeResetNotice}
          />
        ) : (
          ""
        )}
        <div className="clock-title">{t("clock_time_remaining")}</div>
        <div className="clock-timer">
          {new Date(timer * 1000).toISOString().substr(14, 5)}
          <i
            className="reset fa fa-sync pointer"
            alt={t("clock_refresh_alt")}
            title={t("clock_refresh_alt")}
            onClick={this.resetSession}
          />
        </div>
      </div>
    );
  }
}

Clock.propTypes = {};

export default withTranslation()(Clock);
