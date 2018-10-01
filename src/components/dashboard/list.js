import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ReactTable from 'react-table';
import './list.css';

class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sortBy: '',
			sortOrder: 'asc',
			actionButtons: [
				{ icon: 'trash', label: 'delete' },
				{ icon: 'edit', label: 'edit' },
				{ icon: 'eye', label: 'view' }
			]
		};
		this.clickHandler = this.clickHandler.bind(this);
	}

	clickHandler(e) {
		console.log(e.target.dataset.action, e.target.parentElement.id);
	}

	render() {
		const addActions = {
			Header: 'Actions',
			accessor: 'id',
			filterable: false,
			Cell: row => (
				<div>
					<div id={row.row.id} className="actions">
						{_.map(this.state.actionButtons, (b, i) => (
							<i
								key={i}
								data-action={b.label}
								className={`fa fa-${b.icon} action pointer`}
								onClick={this.clickHandler}
							/>
						))}
					</div>
				</div>
			)
		};
		const newSchema = _.concat(this.props.schema.columns, addActions);
		return (
			<div>
				<div className="f4 ttu b mb3">{this.props.title}</div>
				<ReactTable
					data={this.props.data}
					columns={newSchema}
					className="-striped -highlight"
					filterable={true}
				/>
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
