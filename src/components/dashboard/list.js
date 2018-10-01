import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './list.css';

class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sortBy: '',
			sortOrder: 'asc'
		};
	}

	render() {
		return (
			<div>
				<div className="f4 ttu b">{this.props.title}</div>
				<div className={`ba b--light-silver table ${this.props.title}`}>
					<div className="table-row table-header">
						{_.map(this.props.schema.columns, (column, idx) => (
							<div key={idx} className="table-cell">
								{column.title}
							</div>
						))}
					</div>
					{_.map(this.props.data, (row, idx) => (
						<div className="table-row" key={idx}>
							{_.map(this.props.schema.columns, (column, i) => (
								<div className="table-cell" key={i}>
									{row[column.field]}
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		);
	}
}

List.propTypes = {
	data: PropTypes.array,
	title: PropTypes.string,
	schema: PropTypes.object
};

export default List;
