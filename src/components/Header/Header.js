/* eslint no-unused-vars: 0 */
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';

const userLinks = [
	{
		label: 'Account',
		path: '/account',
		Icon: 'user-circle'
	},
	{
		label: 'Dashboard',
		path: '/dashboard',
		Icon: 'tachometer-alt'
	},
	{
		label: 'Info',
		path: '/info',
		Icon: 'info-circle'
	},
	{
		label: 'Help',
		path: '/help',
		Icon: 'question-circle'
	},
	{
		label: 'back',
		path: '/',
		Icon: 'arrow-left'
	}
];
const Header = () => (
	<div>
		<div className="fixed top-0 left-0 pv2 ph3">
			<Link to="/" className="logo">
				<img src={logo} alt="Martin Roth-Initiative" />
			</Link>
			<nav className="ttu flex justify-between">
				<div className="userNav flex flex-column justify-start items-start">
					{userLinks.map(({ label, Icon, path }, key) => (
						<Link key={key} to={path} className="pt1 link silver dim mv3">
							<div className="flex flex-column f6 items-start">
								<i className={`fa fa-${Icon} mb2 fa-2x`} />
								<span className="f7">{label}</span>
							</div>
						</Link>
					))}
				</div>
			</nav>
		</div>
	</div>
);
export default Header;
