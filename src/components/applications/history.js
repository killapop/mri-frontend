import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './history.css';

class History extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div className="history pv3">
        {history ? (
          <div>
            {history.map((item, idx) => (
              <div key={idx} className="history-item">
                <span className={`dark event ${item.event}`}>
                  {item.event} -{' '}
                </span>
                <span className="i date">
                  {moment(item.created_at).format('Do MMM YYYY HH:mm:ss')}
                </span>
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
  history: PropTypes.array
};

export default History;
