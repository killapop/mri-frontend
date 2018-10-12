import React from 'react';
import PropTypes from 'prop-types';

const Layout = ({ children }) => (
  <div className="main center w-100">{children}</div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
