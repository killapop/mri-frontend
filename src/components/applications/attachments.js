import React from 'react';
import PropTypes from 'prop-types';

class Attachments extends React.Component {
  render() {
    const { attachments } = this.props;
    return (
      <div className="history pv3">
        {attachments ? (
          <div>
            {attachments.map((item, idx) => (
              <div key={idx}>
                {item.event} - {item.created_at}
              </div>
            ))}
          </div>
        ) : (
          'NO have'
        )}
      </div>
    );
  }
}

Attachments.propTypes = {
  attachments: PropTypes.array.isRequired
};

export default Attachments;
