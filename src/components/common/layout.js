import React from 'react';
import PropTypes from 'prop-types';

const Layout = ({ children }) => (
  <div>
    <div
      className="main center w-100  pb6"
      style={{ width: '100vw', height: '100%', minHeight: '100vh' }}>
      {children}
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
