import React from "react";
import { Redirect, Link } from "react-router-dom";
import { view } from "@risingstack/react-easy-state";
import SmallBox from "../common/smallBox";
import i18n from "../../i18n.js";
import { withTranslation } from "react-i18next";
import { authStore } from "../../lib/store";
import { apiCall } from "../../lib/api-calls";
import { add as addMessage } from "../../lib/message";

class DeleteUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: null,
      deleted: false,
    };
    this.delete = this.delete.bind(this);
  }

  async componentDidMount() {
    const applications = await apiCall("GET", "/applications", "", true);
    this.setState({
      applications: applications.filter(
        (application) =>
          application.account.email === this.props.match.params.email
      ).length,
    });
    console.log(this.state.applications);
  }

  async delete() {
    await apiCall("DELETE", "/users/" + this.props.match.params.email, "", true)
      .then((statusCode) => {
        if (statusCode === 204) {
          this.setState({
            deleted: true,
          });
          addMessage(
            "success",
            i18n.t("message_deleted_confirmation", {
              who: this.props.match.params.email,
            })
          );
        } else {
          addMessage("danger", i18n.t("message_deleted_error"));
        }
      })
      .catch((err) => {
        console.log(err);
        addMessage("danger", i18n.t("message_deleted_error"));
      });
  }

  render() {
    const { t } = this.props;
    if (authStore.token === "" || this.state.deleted) {
      return <Redirect to="/" />;
    }
    return (
      <SmallBox>
        {this.state.applications ? (
          <div>
            <h3>
              {t("delete_user_count", {
                who: this.props.match.params.email,
                how_many: this.state.applications,
              })}
            </h3>
          </div>
        ) : (
          <div>
            <h3>
              {t("delete_user_confirm_message", {
                who: this.props.match.params.email,
              })}
            </h3>
            <h3 className="red">{t("delete_user_warning")}</h3>
            <input
              className="form-control"
              type="button"
              value={t("delete_user_confirm_button")}
              onClick={this.delete}
            />
          </div>
        )}
        <Link to="/dashboard">{t("common_cancel_return")}</Link>
      </SmallBox>
    );
  }
}
export default withTranslation()(view(DeleteUser));
