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
      <div className="lists pa4 flex flex-column">
        <h1>
          My Applications {` `}
          <span className="list-size">{_.size(listData) || 0}</span>
        </h1>
        <div>
          {_.size(listData) > 0 ? (
            <div className="user-list flex flex-column">
              {_.map(listData, (application, idx) => (
                <div key={application.id} className="flex flex-column w-100">
                  <div className="row flex w-100 justify-between list-item">
                    <div className="id">
                      <Link to={`/applications/${application.id}`}>
                        ID{`:  `}
                        <span>
                          {application.id} {`  `}
                          <i className="fa fa-external-link-alt" />
                        </span>
                      </Link>
                    </div>
                    <div>
                      state: <span>{application.state}</span>
                    </div>
                    <div>
                      Created{`: `}
                      <span>
                        {moment(
                          application.history[_.size(application.history) - 1]
                            .created_at
                        ).format('D-MMM-YYYY')}
                      </span>
                    </div>
                    <div>
                      Updated{`: `}
                      <span>
                        {moment(application.history[0].created_at).format(
                          'D-MMM-YYYY'
                        )}
                      </span>
                    </div>
                    <div>
                      Comments{`: `}
                      <span>{_.size(application.comments)}</span>
                    </div>
                    <div>
                      Processing status{`: `}
                      <span>
                        {application.bundle ? 'under process' : 'pre-process'}
                      </span>
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
