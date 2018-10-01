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
		this.roleChangeHandler = this.roleChangeHandler.bind(this);
		this.state = {
			activeState: '',
			navOpen: true,
			userLinks,
			sessionFilters,
			activeUserState: sessionStorage.getItem('activeUserState'),
			activeRole: sessionStorage.getItem('activeRole')
		};
	}

	roleChangeHandler(e) {
		const id = e.target.id;
		const filtertype = e.target.dataset.filtertype;
		e.persist();
		sessionStorage.setItem(
			filtertype,
			sessionStorage.getItem(filtertype) === id ? '' : id
		);
		this.setState(state => ({ [filtertype]: id }));
	}

	componentDidMount() {
		this.setState(state => ({
			activeState: '/' + window.location.pathname.split('/')[1]
		}));
	}

	render() {
		return (
			<div>
				<div className="header fixed top-0 left-0 pv2 h-100 bg-white">
					<Link to="/" onClick={this.navClickHandler} className="logo ph3">
						<img src={logo} alt="Martin Roth-Initiative" />
					</Link>
					<nav className="ttu flex justify-between mt3">
						<div className="userNav flex flex-column justify-start w-100 items-start">
							{this.state.userLinks.map(({ label, Icon, path }, key) => (
								<Link
									key={key}
									to={path}
									id={label.toLowerCase().replace(' ', '')}
									data-path={path}
									className={`navLink pt1 pv2 link silver mv3 w-100 ${
										window.location.pathname.split('/')[1] ===
										path.split('/')[1]
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
