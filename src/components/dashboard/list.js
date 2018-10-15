import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import { view } from 'react-easy-state';
import { authStore } from '../../lib/store';
import { listData } from '../../data/testData';
import { getOptions, baseURL, apiRoutes } from '../../lib/api-calls.js';

import './list.css';

class FacilitatorList extends React.Component {
  constructor(props) {
    super(props);
    this.getList = this.getList.bind(this);
    this.state = {
      actionButtons: [
        { icon: 'eye', label: 'view' },
        { icon: 'edit', label: 'edit' },
        { icon: 'trash', label: 'delete' }
      ],
      listData: []
    };
  }

  componentDidMount() {
    const apiPath =
      authStore.currentRole !== 'facilitator'
        ? 'applications'
        : authStore.activeList.slug === 'personalstatements' ||
          authStore.activeList.slug === 'projectproposals'
          ? 'applications'
          : authStore.activeList.slug;
    this.getList(apiPath);
  }

  getList(list) {}

  render() {
    const list =
      authStore.currentRole !== 'facilitator'
        ? 'myforms'
        : authStore.activeList.slug === 'personalstatements' ||
          authStore.activeList.slug === 'projectproposals'
          ? 'forms'
          : authStore.activeList.slug;

    const addActions = {
      Header: 'Actions',
      accessor: 'id',
      filterable: false,
      sortable: false,
      Cell: row => (
        <div>
          <div id={row.row.id} className="actions">
            {_.map(this.state.actionButtons, (b, i) => (
              <i
                key={i}
                data-action={b.label}
                className={`fa fa-${b.icon} action pointer`}
                onClick={this.clickHandler}
              />
            ))}
          </div>
        </div>
      )
    };
    const newSchema = _.concat(listData[list].schema, addActions);
    let link;
    switch (authStore.activeList.slug) {
      case 'users':
        link = '/user/create';
        break;
      case 'projectproposals':
      case 'personalstatements':
        link = '/forms/create';
        break;
      case 'bundles':
        link = '/bundles/create';
        break;
      default:
        link = '';
    }
    const listObject = this.props.list;
    return (
      <div className="lists w-80-l center pa4 flex flex-column">
        {authStore.currentRole === 'facilitator' ? (
          <Link
            to={link}
          className="create pointer right ttu f6 b self-end pv2 ph3 white bg-primary-color mb2 ba b--very-ver-light link">
            <i className="fa fa-plus-circle" /> Create
          </Link>
        ) : (
          ''
        )}
        <h1>
          {listObject.title}{' '}
          <span className="list-size">{_.size(list) || 0}</span>
        </h1>
        <ReactTable
          data={listData[list].data}
          columns={newSchema}
          className="-highlight"
          filterable={true}
        />
      </div>
    );
  }
}

FacilitatorList.propTypes = {
  list: PropTypes.object
};

export default view(FacilitatorList);
