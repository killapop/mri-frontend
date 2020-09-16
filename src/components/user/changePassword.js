import React from "react";
import Form from "react-jsonschema-form";
import { Redirect } from "react-router-dom";
import { view } from "@risingstack/react-easy-state";
import i18n from "../../i18n.js";
import { withTranslation } from "react-i18next";
import SmallBox from "../common/smallBox";
import { authStore } from "../../lib/store";
import { apiCall } from "../../lib/api-calls";
import { add as addMessage } from "../../lib/message";

import { change } from "../../schema/user";

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      change: false,
      user: "",
    };
    this.change = this.change.bind(this);
    this.validate = this.validate.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
  }

  validate(formData, errors) {
    if (formData.pass1 !== formData.pass2) {
      errors.pass2.addError("Passwords do not match");
    }
    return errors;
  }

  async refreshToken() {
    await apiCall("POST", "/users/refresh", "", true).then(
      (data) => (authStore.token = data.token)
    );
  }

  async change({ formData }) {
    const body = {
      password: formData.pass1,
    };

    await apiCall(
      "PUT",
      "/users/" + this.props.match.params.email,
      JSON.stringify(body),
      true
    )
      .then((result) => {
        if (result === 204) {
          this.refreshToken();
        }
      })
      .then(() => {
        this.setState({
          change: true,
        });
        addMessage("success", i18n.t("message_changed_confirmation"));
      })
      .catch((err) => {
        console.log(err);
        addMessage("danger", i18n.t("message_changed_error"));
      });
  }

  render() {
    const { t } = this.props;
    const changeForm = change(t);
    if (this.state.change || authStore.tokem === "") {
      return <Redirect to="/" />;
    }
    return (
      <SmallBox>
        <Form
          showErrorList={false}
          schema={changeForm.schema}
          uiSchema={changeForm.uiSchema}
          onSubmit={this.change}
          validate={this.validate}
          method="POST"
        >
          <div className="form-actions form-group flex justify-end">
            <button type="submit">
              {changeForm.schema.submitButton}
              <i className="fa fa-user-plus ml2" />
            </button>
          </div>
        </Form>
      </SmallBox>
    );
  }
}
export default withTranslation()(view(ChangePassword));
