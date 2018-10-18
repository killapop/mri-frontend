import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import { view } from 'react-easy-state';
import { authStore, messages } from '../../lib/store';
import { listSchema } from '../../data/lists';
import { getOptions, baseURL } from '../../lib/api-calls.js';

import './list.css';

class FacilitatorList extends React.Component {
  state = {
    actionButtons: [
      { icon: 'eye', label: 'view' },
      { icon: 'edit', label: 'edit' },
      { icon: 'trash', label: 'delete' }
    ]
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log(nextProps.list, prevState.list);
    if (nextProps.list !== prevState.list) {
      return { list: nextProps.list, loaded: null };
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.loaded, prevState.loaded);
    if (this.state.loaded === null && prevState.loaded !== null) {
      this._getList();
    }
  }

  componentDidMount() {
    this._getList();
  }

  shouldComponentUpdate() {
    return true;
  }

  _getPath() {
    const l = this.props.list;
    return l.slug === 'personalstatements' || l.slug === 'projectproposals'
      ? 'applications'
      : l.slug;
  }

  _getList() {
    Object.assign(getOptions, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    });
    return fetch(baseURL + '/' + this._getPath(), getOptions)
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
            listData: result.data,
            loaded: !this.state.loaded
          }));
        }
      });
  }

  render() {
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

    const newSchema = _.concat(listSchema[this._getPath()], addActions);

    // console.log(newSchema);
    return (
      <div>
        {this.state.loaded === null ? (
          <div>
            <h1>AAAAAAA LOADING</h1>
          </div>
        ) : (
          <div>
            <div className="lists w-80-l center pa4 flex flex-column">
              {this.props.list.slug !== 'activations' ? (
                <Link
                  to={`/${this._getPath()}/create`}
                  className="create pointer right ttu f6 b self-end pv2 ph3 white bg-primary-color mb2 ba b--very-ver-light link">
                  <i className="fa fa-plus-circle" /> Create
                </Link>
              ) : (
                ''
              )}
              <h1>
                {this.props.list.title} {` `}
                <span className="list-size">
                  {_.size(this.state.listData) || 0}
                </span>
              </h1>
              {_.map(this.state.listData, (e, i) => (
                <li key={i}>
                  {e.id} - {e.email}
                </li>
              ))}
              <ReactTable
                data={this.state.listData}
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
