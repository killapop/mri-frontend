import React from 'react';
import Form from 'react-jsonschema-form';
import * as forms from '../../schema/forms';
import { authStore } from '../../lib/store';

class FormForm extends React.Component {
  render() {
    const form = forms[authStore.activeList.slug];
    return (
      <div>
        <div className="formContainer pa4 bg-white shadow-light mv3">
          <Form schema={form.schema} uiSchema={form.uiSchema} />
        </div>
        {/* {authStore.isLoggedIn ? (
          <Redirect to="/" />
          ) : (
          <div className="formContainer pa4 bg-white shadow-light mv3">
            <Form schema={form.schema} uiSchema={form.uiSchema} />
          </div>
        )} */}
      </div>
    );
  }
}

export default FormForm;
