import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { authStore } from '../../lib/store';
import { apiCall } from '../../lib/api-calls';
import './list.css';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.getApplications = this.getApplications.bind(this);
    this.state = {
      actionButtons: [
        { icon: 'edit', label: 'edit' },
        { icon: 'trash', label: 'delete' }
      ],
      listData: []
    };
  }

  async componentDidMount() {
    await this.getApplications();
  }

  getApplications() {
    apiCall('GET', '/applications', '', true).then(data => {
      if (data === 401) {
        authStore.token = '';
        authStore.user = {};
      }
      this.setState(state => ({
        listData: data
      }));
    });
  }

  render() {
    const { listData } = this.state;
    return (
      <div className="lists w-80-l pt0 center pa4 flex flex-column">
        <h1>
          My Applications {` `}
          <span className="list-size">{_.size(listData) || 0}</span>
        </h1>
        <div>
          {_.size(listData) > 0 ? (
            <div className="list flex flex-column">
              {_.map(listData, (application, idx) => (
                <div
                  key={application.id}
                  className="list-item flex flex-column w-100">
                  <div className="row flex w-100 justify-between">
                    <div className="id">
                      <Link to={`/applications/${application.id}`}>
                        ID{`:  `}
                        {application.id} {`  `}
                        <i className="fa fa-external-link-alt" />
                      </Link>
                    </div>
                    <div>state: {application.state}</div>
                    <div>
                      Created{`: `}
                      {moment(
                        application.history[_.size(application.history) - 1]
                          .created_at
                      ).format('D-MMM-YYYY')}
                      {` `}
                    </div>
                    <div>
                      Updated{`: `}
                      {moment(application.history[0].created_at).format(
                        'D-MMM-YYYY'
                      )}
                      {` `}
                    </div>
                    <div>
                      Comments{`: `}
                      {_.size(application.comments)}
                      {` `}
                    </div>
                    <div>
                      Processing status{`: `}
                      {application.bundled ? 'under process' : 'pre-process'}
                      {` `}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="f5 ttu gray">No Applications found.</div>
          )}
        </div>
      </div>
    );
  }
}

UserList.propTypes = {
  list: PropTypes.object
};

export default UserList;
