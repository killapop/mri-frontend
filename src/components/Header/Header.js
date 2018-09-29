/* eslint no-unused-vars: 0 */
import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import logo from '../../assets/images/logo.svg';
import TestValues from '../common/testValues';
import { userLinks, sessionFilters } from '../../data/testData';
import './Header.css';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.navClickHandler = this.navClickHandler.bind(this);
		this.roleChangeHandler = this.roleChangeHandler.bind(this);
		this.state = {
			navOpen: true,
			userLinks,
			sessionFilters,
			activeUserState: '',
			activeRole: ''
		};
	}

	navClickHandler(e) {
		e.persist();
		this.setState(state => ({
			activeState: e.target.id
		}));
	}

	roleChangeHandler(e) {
		const id = e.target.id;
		const filtertype = e.target.dataset.filtertype;
		console.log(id, filtertype);
		e.persist();
		sessionStorage.setItem(
			filtertype,
			sessionStorage.getItem(filtertype) === id ? '' : id
		);
		console.log(filtertype, sessionStorage);
		this.setState(state => ({ filtertype: id }));
	}

	render() {
		return (
			<div>
				<div className="header fixed top-0 left-0 pv2 h-100 bg-white">
					<Link to="/" className="logo ph3">
						<img src={logo} alt="Martin Roth-Initiative" />
					</Link>
					<nav className="ttu flex justify-between mt3">
						<div className="userNav flex flex-column justify-start w-100 items-start">
							{this.state.userLinks.map(({ label, Icon, path }, key) => (
								<Link
									key={key}
									to={path}
									id={label.toLowerCase().replace(' ', '')}
									onClick={this.navClickHandler}
									className={`navLink pt1 pv2 link silver mv3 w-100 ${
										this.state.activeState ===
										label.toLowerCase().replace(' ', '')
											? 'active'
											: ''
									}`}>
									<div className="flex flex-column f6 items-start items-center">
										<i className={`fa fa-${Icon} mb2 fa-2x`} />
										<span className="f7">{label}</span>
									</div>
								</Link>
							))}
						</div>
					</nav>
				</div>
				<TestValues
					data={this.state.sessionFilters}
					roleChangeHandler={this.roleChangeHandler}
				/>
			</div>
		);
	}
}
export default Header;
