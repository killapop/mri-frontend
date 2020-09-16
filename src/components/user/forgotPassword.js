import React from "react";
import Form from "react-jsonschema-form";
import SmallBox from "../common/smallBox";
import { Redirect } from "react-router-dom";
import { withTranslate } from "react-i18next";
import { authStore } from "../../lib/store";
import { forgot } from "../../schema/user";

import "../../assets/css/forms.css";

class ForgotPassword extends React.Component {
  render() {
    const { t } = this.props;
    const forgotForm = forgot(t);
    return (
      <SmallBox>
        {authStore.isLoggedIn ? (
          <Redirect to="/" />
        ) : (
          <Form schema={forgotForm.schema} uiSchema={forgotForm.uiSchema}>
            <div className="form-actions form-group flex justify-end">
              <button type="submit">
                {forgotForm.schema.submitButton}
                <i className="fa fa-key ml2" />
              </button>
            </div>
          </Form>
        )}
      </SmallBox>
    );
  }
}

export default withTranslate()(ForgotPassword);
