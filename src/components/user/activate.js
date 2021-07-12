import React from "react";
import Form from "react-jsonschema-form";
import { withTranslation } from "react-i18next";
import i18n from "../../i18n.js";
import SmallBox from "../common/smallBox";
import { apiCall } from "../../lib/api-calls";
import { add as addMessage } from "../../lib/message";

import { activate } from "../../schema/user";

class ActivateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activated: false,
      user: "",
    };
    this.activate = this.activate.bind(this);
    this.validate = this.validate.bind(this);
  }

  validate(formData, errors) {
    if (formData.pass1 !== formData.pass2) {
      errors.pass2.addError(i18n.t("error_matching_passwords"));
    }
    return errors;
  }

  async activate({ formData }) {
    const body = {
      password: formData.password,
      account: {
        name: formData.name,
        password: formData.pass1,
      },
    };

    await apiCall(
      "POST",
      "/activations/" + this.props.match.params.token,
      JSON.stringify(body),
      false
    )
      .then((result) => {
        if (result === 204) {
          this.setState({
            activated: true,
          });
          addMessage("success", i18n.t("message_activation_successful"));
        }
      })
      .catch((err) => {
        console.log(err);
        addMessage("warning", i18n.t("message_error_activation"));
      });
  }

  render() {
    const { t } = this.props;
    const activateForm = activate(t);
    return (
      <SmallBox>
        {this.state.activated ? (
          <div>
            <h1>{t("activated_title")}!</h1>
            <div className="f4">
              {t("activated_confirmation")}.
              <a href="/">{t("activated_login")}</a>
            </div>
          </div>
        ) : (
          <Form
            schema={activateForm.schema}
            uiSchema={activateForm.uiSchema}
            onSubmit={this.activate}
            validate={this.validate}
            method="POST"
          >
            <div className="form-actions form-group flex justify-end">
              <button type="submit">
                {activateForm.schema.submitButton}
                <i className="fa fa-user-plus ml2" />
              </button>
            </div>
          </Form>
        )}
      </SmallBox>
    );
  }
}
export default withTranslation()(ActivateUser);
