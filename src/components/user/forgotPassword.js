import React from 'react';
import Form from 'react-jsonschema-form';
import { forgot } from '../../schema/user';

import '../../assets/css/forms.css';

class ForgotPassword extends React.Component {
	render() {
		return (
			<div className="center small-box w-90 w-50-ns bg-very-very-light shadow-light pa4 mt6 ba b--very-ver-light ">
				<Form schema={forgot.schema} uiSchema={forgot.uiSchema}>
					<div className="form-group flex justify-end">
						<button type="submit">{forgot.schema.submitButton}</button>
					</div>
				</Form>
			</div>
		);
	}
}

export default ForgotPassword;
