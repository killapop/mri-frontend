import React from 'react';
import PropTypes from 'prop-types';

class TestValues extends React.Component {
	render() {
		return (
			<div className="test-values pa0 form-group-inline fixed left-0 bt b--light-silver bg-gray white pv2 w-10 shadow-light">
				<div className="f6 ttu b db pa2">Text values</div>
				<div className="form w-90 center">{this.props.children}</div>
			</div>
		);
	}
}

TestValues.propTypes = {
	children: PropTypes.node.isRequired
};

export default TestValues;
