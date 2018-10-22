import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { view } from 'react-easy-state';
// import { authStore, messages } from '../../lib/store';
import { listSchema } from '../../data/lists';
import { getList } from '../../lib/api-calls.js';

import './list.css';

class FacilitatorList extends React.Component {
  state = {
    actionButtons: {
      activations: [{ icon: 'ban', label: 'invalidate' }],
      users: [{ icon: 'trash', label: 'delete' }]
    },
    activations: [],
    users: [],
    applications: [],
    projectProposals: [],
    personalStatements: [],
    bundles: []
  };

  async componentDidMount() {
    await this._getLists();
  }

  _getLists() {
    _.forEach(
      [
        'activations',
        'users',
        'projectProposals',
        'personalStatements',
        'bundles'
      ],
      k => {
        getList(
          '/' +
            (k === 'personalStatements' || k === 'projectProposals'
              ? 'applications'
              : k)
        ).then(data =>
          this.setState(state => ({
            [k]:
              k === 'personalStatements' || k === 'projectProposals'
                ? _.filter(data, r => r.form === k)
                : data,
            loaded: true
          }))
        );
      }
    );
  }

  clickHandler(e) {
    const { type, id, action } = e.target.dataset;
    const pathname = `/${type}/${action}/${id}`;
    console.log(pathname);
    this.setState(state => ({ redirect: pathname }));
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
      accessor: path === 'activations' ? 'token' : 'id',
      filterable: false,
      sortable: false,
      Cell: row => (
        <div>
          <div id={row.row.token} className="actions">
            {_.map(this.state.actionButtons[path], (b, i) => (
              <i
                key={i}
                data-action={b.label}
                data-type={path === 'activations' ? 'users' : path}
                data-id={path === 'activations' ? row.row.token : row.row.id}
                data-data={row}
                className={`fa fa-${b.icon} action pointer`}
                onClick={e => this.clickHandler(e)}
                title={b.label}
              />
            ))}
          </div>
        </div>
      )
    };

    const newSchema = _.concat(listSchema[path], addActions);

    return (
      <div>
        {this.state.redirect ? <Redirect to={this.state.redirect} /> : ''}
        {loaded === null ? (
          <div className="center">
            <h1>AAAAAAA LOADING</h1>
          </div>
        ) : (
          <div>
            <div className="lists w-80-l center pa4 flex flex-column">
              <div className="flex justify-between">
                <h1>
                  {list.title} {` `}
                  <span className="list-size">
                    {_.size(this.state[path]) || 0}
                  </span>
                </h1>
                {list.slug !== 'activations' ? (
                  <Link
                    to={`/${path}/create`}
                    className="create pointer right ttu f6 b self-end pv2 ph3 white bg-primary-color mb2 ba b--very-ver-light link">
                    <i className="fa fa-plus-circle" /> Create
                  </Link>
                ) : (
                  ''
                )}
              </div>
              <ReactTable
                data={this.state[path]}
                columns={newSchema}
                filterable={true}
                defaultPageSize={10}
                className="-striped -highlight"
                defaultFilterMethod={(filter, row) =>
                  String(row[filter.id])
                    .toLowerCase()
                    .indexOf(filter.value) >= 0
                }
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

FacilitatorList.propTypes = {
  list: PropTypes.object,
  history: PropTypes.object
};

export default withRouter(view(FacilitatorList));
