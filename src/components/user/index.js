import React from 'react';
import Form from 'react-jsonschema-form';
import * as Schemas from '../../schema/user';
import Layout from '../common/layout';

import '../../assets/css/forms.css';

class UserIndex extends React.Component {
	// constructor(props) {
	//   super(props)
	// }

	render() {
		const page = window.location.pathname.split('/').reverse()[0];
		const formSchema = Schemas[page ? page : 'login'];
		return (
			<Layout>
				<div className="center w-90 w-50-ns bg-very-very-light shadow-light pa4">
					<Form schema={formSchema.schema} uiSchema={formSchema.uiSchema}>
						<div className="form-group flex justify-end">
							<button type="submit">{formSchema.schema.submitButton}</button>
						</div>
					</Form>
				</div>
			</Layout>
		);
	}
}

export default UserIndex;
