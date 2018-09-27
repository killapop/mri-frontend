import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header/Header';

const Layout = ({ children }) => (
	<div>
		<Header />
		<div
			className="main center w-90 bg-near-white pv6"
			style={{ width: '100vw', height: '100%', minHeight: '100vw' }}>
			{children}
		</div>
	</div>
);

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default Layout;
