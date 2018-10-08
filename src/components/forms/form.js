import React from 'react';
import { projectProposal } from '../../schema/forms';
import Form from 'react-jsonschema-form';

class FormForm extends React.Component {
  render() {
    return (
      <div className="formContainer pa4 bg-white shadow-light mv3">
        <Form
          schema={projectProposal.schema}
          uiSchema={projectProposal.uiSchema}
        />
      </div>
    );
  }
}

export default FormForm;
