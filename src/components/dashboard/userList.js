import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { getOptions, baseURL, apiRoutes } from '../../lib/api-calls.js';

import './list.css';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.getList = this.getList.bind(this);
    this.state = {
      actionButtons: [
        { icon: 'edit', label: 'edit' },
        { icon: 'trash', label: 'delete' }
      ],
      listData: []
    };
  }

  componentDidMount() {
    this.getList();
  }

  getList() {}

  render() {
    return (
      <div className="lists w-80-l pt0 center pa4 flex flex-column">
        <h1> My Applications</h1>
        {/* <ReactTable data={``} columns={``} className="-highlight" /> */}
      </div>
    );
  }
}

UserList.propTypes = {
  list: PropTypes.object
};

export default UserList;
