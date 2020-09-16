import React from "react";
import Form from "react-jsonschema-form";
import { Redirect } from "react-router-dom";
import { view } from "@risingstack/react-easy-state";
import SmallBox from "../common/smallBox";
import { withTranslation } from "react-i18next";
import i18n from "../../i18n.js";
import { authStore } from "../../lib/store";
import { apiCall } from "../../lib/api-calls";
import { add as addMessage } from "../../lib/message";

import { create } from "../../schema/user";

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      created: false,
      user: "",
    };
    this.create = this.create.bind(this);
  }

  async create({ formData }) {
    await apiCall("POST", "/activations", JSON.stringify(formData), true)
      .then((result) => {
        if (result) {
          this.setState({
            user: result,
            created: true,
          });
          addMessage(
            "success",
            i18n.t("message_user_created", { who: formData.email })
          );
        }
      })
      .catch((err) => {
        console.log(err);
        addMessage(
          "danger",
          i18n.t("message_user_not_created", { who: formData.email })
        );
      });
  }

  render() {
    const { t } = this.props;
    const createForm = create(t);
    if (authStore.token === "") {
      return <Redirect to="/" />;
    }
    return (
      <SmallBox>
        <div>
          {this.state.created ? (
            <div className="pv4 ph3">
              <div className="title">{t("created_title")}</div>
              <div className="f4 mb4">
                {t("created_activation", { who: this.state.user.email })}
              </div>
              <div className="mb3">
                <label>URL: </label>
                <p>
                  {`${window.location.origin}/users/activate/${this.state.user.token}`}
                </p>
              </div>
              <div>
                <label>{t("login_password")}: </label>
                <p>{this.state.user.password}</p>
              </div>
            </div>
          ) : (
            <Form
              schema={createForm.schema}
              uiSchema={createForm.uiSchema}
              onSubmit={this.create}
              method="POST"
            >
              <div className="form-actions form-group flex justify-end">
                <button type="submit">
                  {createForm.schema.submitButton}
                  <i className="fa fa-user-plus ml2" />
                </button>
              </div>
            </Form>
          )}
        </div>
      </SmallBox>
    );
  }
}
export default withTranslation()(view(CreateUser));
