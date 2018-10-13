import React from 'react';
import PropTypes from 'prop-types';

const SmallBox = ({ children }) => (
  <div className="center small-box w-90 w-50-l">{children}</div>
);

SmallBox.propTypes = {
  children: PropTypes.node.isRequired
};

export default SmallBox;
