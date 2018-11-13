import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class History extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div className="history pv3">
        {history ? (
          <div>
            {history.map((item, idx) => (
              <div key={idx}>
                {item.event} -{' '}
                {moment(item.created_at).format('DD.MM.YYYY HH:mm:ss')}
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

History.propTypes = {
  history: PropTypes.array.isRequired
};

export default History;
