import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import { view } from 'react-easy-state';
import { authStore, messages } from '../../lib/store';
import { listSchema } from '../../data/lists';
import { baseURL } from '../../lib/api-calls.js';

import './list.css';

class FacilitatorList extends React.Component {
  state = {
    actionButtons: [
      { icon: 'eye', label: 'view' },
      { icon: 'edit', label: 'edit' },
      { icon: 'trash', label: 'delete' }
    ],
    activations: [],
    users: [],
    applications: [],
    projectProposals: [],
    personalStatements: [],
    bundles: []
  };

  componentDidMount() {
    this._getLists();
  }

  _getPath() {
    const { list } = this.props;
    return list.slug === 'personalStatements' ||
      list.slug === 'projectProposals'
      ? 'applications'
      : list.slug;
  }

  _getLists() {
    const getOptions = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + authStore.token,
        'Content-Type': 'application/json'
      }
    };
    _.forEach(
      [
        'activations',
        'users',
        'projectProposals',
        'personalStatements',
        'bundles'
      ],
      k => {
        fetch(
          baseURL +
            '/' +
            (k === 'personalStatements' || k === 'projectProposals'
              ? 'applications'
              : k),
          getOptions
        )
          .then(response => {
            if (response.status !== 401) {
              return response.json();
            } else {
              messages.messages.push({
                id: Math.random(),
                message: 'Error: There was an error retrieving data',
                level: 'danger'
              });
            }
          })
          .then(result => {
            if (result.data) {
              return this.setState(state => ({
                [k]: result.data,
                loaded: true
              }));
            }
          });
      }
    );
  }

  render() {
    const { loaded } = this.state;
    const { list } = this.props;
    const path =
      list.slug === 'personalStatements' || list.slug === 'projectProposals'
        ? 'applications'
        : list.slug;
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

    const newSchema = _.concat(listSchema[path], addActions);

    return (
      <div>
        {loaded === null ? (
          <div className="center">
            <h1>AAAAAAA LOADING</h1>
          </div>
        ) : (
          <div>
            <div className="lists w-80-l center pa4 flex flex-column">
              {list.slug !== 'activations' ? (
                <Link
                  to={`/${path}/create`}
                  className="create pointer right ttu f6 b self-end pv2 ph3 white bg-primary-color mb2 ba b--very-ver-light link">
                  <i className="fa fa-plus-circle" /> Create
                </Link>
              ) : (
                ''
              )}
              <h1>
                {list.title} {` `}
                <span className="list-size">
                  {_.size(this.state[path]) || 0}
                </span>
              </h1>
              {_.map(this.state[path], (e, i) => (
                <li key={i}>
                  {e.id} - {e.email}
                </li>
              ))}
              <ReactTable
                data={this.state[path]}
                columns={newSchema}
                filterable={true}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

FacilitatorList.propTypes = {
  list: PropTypes.object
};

export default view(FacilitatorList);
