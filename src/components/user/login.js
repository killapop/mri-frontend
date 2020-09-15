import React from "react";
import { Redirect } from "react-router-dom";
import Form from "react-jsonschema-form";
import SmallBox from "../common/smallBox";
import jwt from "jsonwebtoken";
import { login } from "../../schema/user";
import { withTranslation } from "react-i18next";
import i18n from "../../i18n.js";
import { authStore } from "../../lib/store.js";
import { getAuth } from "../../lib/api-calls.js";
import { add as addMessage } from "../../lib/message";
import "../../assets/css/forms.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.errors = this.errors.bind(this);
    this.state = {
      loggedIn: false,
    };
  }

  componentDidMount() {
    this.setState({
      loggedIn: authStore.token !== "",
    });
  }

  async login({ formData }) {
    await getAuth("POST", "/users", JSON.stringify(formData)).then((data) => {
      if (data) {
        authStore.token = data.token;
        authStore.user = jwt.decode(data.token);
        this.setState(() => ({ loggedIn: true }));
        addMessage("success", i18n.t("logged_in_success"));
        window.sessionStorage.accessToken = data.token;
        window.sessionStorage.activeTitle = authStore.activeList.title;
        window.sessionStorage.activeList = authStore.activeList.slug;
      } else {
        addMessage(
          "danger",
          "There was a problem logging in. Please check your email address or password."
        );
      }
    });
  }

  errors({ errors }) {
    console.log(errors);
    addMessage(
      "danger",
      "There was a problem logging in. Please check your email address or password."
    );
  }

  render() {
    const loginForm = login(i18n);
    const { loggedIn } = this.state;
    if (loggedIn === true) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <SmallBox>
        <Form
          schema={loginForm.schema}
          uiSchema={loginForm.uiSchema}
          onSubmit={this.login}
          onError={this.errors}
          formData={this.state.formData}
          showErrorList={true}
          autocomplete="off"
          method="POST"
        >
          <div className="form-actions form-group flex justify-end">
            <button type="submit">
              {loginForm.schema.submitButton}
              <i className="fa fa-sign-in-alt ml2" />
            </button>
          </div>
        </Form>
      </SmallBox>
    );
  }
}

export default withTranslation()(Login);
