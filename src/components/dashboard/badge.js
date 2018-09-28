import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Badge extends React.Component {
	render() {
		const badge = this.props.badge;

		const hasValue = () => {
			return (
				<div className="badgeValue">
					{_
						.chain(badge.types)
						.map('value')
						.sum()
						.value()}
				</div>
			);
		};

		// const badgeTypes = () => {
		// 	return badge.types ? (
		// 		<div className="badgeItems">
		// 			{_.map(badge.types, (type, idx) => (
		// 				<div
		// 					key={idx}
		// 					className="badgeItem relative mt3 mb2 w-100 bg-light-silver ph2 pv1">
		// 					{type.title}
		// 				</div>
		// 			))}
		// 		</div>
		// 	) : (
		// 		''
		// 	);
		// };
		return (
			<div
				onClick={this.props.clickHandler}
				className={`badge pa3 flex flex-column justify-start items-center  pointer relative bg-light-gray mr3 ${
					this.props.active ? 'active' : ''
				}`}
				id={this.props.badge.title.replace(' ', '').toLowerCase()}>
				<i className={`fa fa-${badge.icon} fa-3x mt3 mb1 gray`} />
				{hasValue()}
				<div className="f4 gray t-shadow-light b">{this.props.badge.title}</div>
			</div>
		);
	}
}

Badge.propTypes = {
	activeState: PropTypes.bool,
	badge: PropTypes.object.isRequired,
	clickHandler: PropTypes.func,
	active: PropTypes.bool
};

export default Badge;
