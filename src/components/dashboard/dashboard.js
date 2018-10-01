/* eslint no-unused-expresions: 0 */
import React from 'react';
import _ from 'lodash';
import Badge from './badge.js';
import List from './list.js';
import { listData, badges } from '../../data/testData.js';
import './dashboard.css';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeBadge: 'users',
			listData,
			badges,
			activeRole: sessionStorage.getItem('activeRole')
		};
		this.badges = this.badges.bind(this);
		this.badgeChangeHandler = this.badgeChangeHandler.bind(this);
	}

	badgeChangeHandler(e) {
		e.persist();
		this.setState(state => ({ activeBadge: e.target.id }));
	}

	isChecked(e) {
		return e.target.id === this.state.activeRole ? true : false;
	}

	componentWillUpdate() {
		return true;
	}

	badges() {
		return sessionStorage.getItem('activeRole') === 'facilitator' ? (
			<div className="badges flex flex-wrap">
				{_.map(this.state.badges, (badge, idx) => (
					<Badge
						badge={badge}
						key={idx}
						clickHandler={this.badgeChangeHandler}
						active={
							this.state.activeBadge ===
							badge.title.replace(' ', '').toLowerCase()
						}
					/>
				))}
			</div>
		) : (
			''
		);
	}

	render() {
		return (
			<div>
				<div className=" w-80-ns center pa4">
					<div className="title">Dashboard - {this.state.activeRole}</div>
					{this.badges()}
				</div>
				<div className="lists w-80-ns center">
					<List
						data={
							this.state.listData[
								this.state.activeBadge.replace(' ', '').toLowerCase()
							]
						}
						title={this.state.activeBadge}
					/>
				</div>
			</div>
		);
	}
}

export default Dashboard;
