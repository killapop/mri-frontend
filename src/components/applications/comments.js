import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class Comments extends React.Component {
  render() {
    const { comments } = this.props;
    return (
      <div className="history pv3">
        {comments ? (
          <div>
            {comments.map((item, idx) => (
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

Comments.propTypes = {
  comments: PropTypes.array.isRequired
};

export default Comments;
