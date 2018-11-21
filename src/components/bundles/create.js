import React from 'react';
import { Redirect } from 'react-router-dom';
import { view } from 'react-easy-state';
import _ from 'lodash';
import ReactTable from 'react-table';
import { authStore } from '../../lib/store';
import { apiCall } from '../../lib/api-calls';
import { add as addMessage } from '../../lib/message';

import './create.css';

class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      created: false,
      all: [],
      listed: [],
      selected: [],
      schema: [
        {
          accessor: 'id',
          Header: 'Id'
        },
        {
          accessor: 'account.email',
          Header: 'Applicant'
        },
        {
          accessor: 'form',
          Header: 'Type',
          Cell: row => this.getType(row.row.form)
        },
        {
          Header: 'Actions',
          accessor: 'id',
          filterable: false,
          sortable: false,
          Cell: row => (
            <div
              id={row.value}
              onClick={this.select}
              className="center pointer">
              <i className="mr2 fa fa-folder-plus fa-15x green" />select
            </div>
          )
        }
      ]
    };
    this.select = this.select.bind(this);
    this.deselect = this.deselect.bind(this);
    this.getType = this.getType.bind(this);
  }

  select(ev) {
    ev.persist();
    const { listed, selected } = this.state;
    this.setState(state => ({
      listed: _.without(listed, ev.target.id),
      selected: _.concat(selected, ev.target.id)
    }));
  }

  deselect(ev) {
    ev.persist();
    const { listed, selected } = this.state;
    this.setState(state => ({
      listed: _.concat(listed, ev.target.id),
      selected: _.without(selected, ev.target.id)
    }));
  }

  async componentDidMount() {
    await apiCall('GET', '/applications', '', true)
      .then(applications => {
        if (applications) {
          const all = _.filter(
            applications,
            application =>
              application.state === 'finalized' && !application.bundle
          );
          this.setState(state => ({ all, listed: _.map(all, 'id') }));
        }
      })
      .catch(err => this.setState(state => ({ all: [] })));
  }

  async create(e) {
    e.persist();
    await apiCall(
      'POST',
      '/bundles',
      JSON.stringify({
        case_worker: authStore.user.email,
        applications: this.state.selected
      }),
      true
    )
      .then(data => {
        this.setState(state => ({ created: true }));
        addMessage('success', 'New bundle created');
      })
      .catch(err => {
        addMessage(
          'danger',
          'There was an error creating the bundle. Please try again after some time'
        );
      });
  }

  getType(form) {
    switch (_.trim(form)) {
      case 'personalStatements-1.json':
        return 'Personal Statement PL 1';
      case 'personalStatements-2.json':
        return 'Personal Statement PL 2';
      case 'projectProposals-1.json':
        return 'Project Proposal PL 1';
      default:
        return 'Project Proposal PL 2';
    }
  }

  render() {
    const { all, listed, selected, created } = this.state;
    let lApplications = [],
      sApplications = [];
    _.forEach(
      listed,
      li => (lApplications[li] = _.find(all, a => a.id === li))
    );
    _.forEach(
      selected,
      li => (sApplications[li] = _.find(all, a => a.id === li))
    );

    if (authStore.token === '' || created) {
      return <Redirect to="/" />;
    }
    return (
      <div className=" w-80-ns center pa4 flex flex-column">
        <div className="title pb0 flex justify-start">Create a bundle</div>
        <div className="selected pv4">
          <h1>
            Selected applications {` `}
            <span className="list-size">{_.size(selected)}</span>
          </h1>
          {selected.length > 0 ? (
            <div className="flex flex-column">
              <div className="selected-header w-100 flex">
                <div className="text-center b">Id</div>
                <div className="text-center b">Applicant</div>
                <div className="text-center b">Type</div>
                <div className="text-center b">Actions</div>
              </div>
              {_.map(selected, (item, idx) => (
                <div className="selected-item w-100 flex" key={idx}>
                  <div className="id">{item}</div>
                  <div className="id">{sApplications[item].account.email}</div>
                  <div className="id">
                    {this.getType(sApplications[item].form)}
                  </div>
                  <div className="id">
                    <div id={item} onClick={this.deselect} className="pointer">
                      <i className="mr2 fa fa-trash red" />deselect
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div />
          )}
        </div>
        <div className="listed pv4">
          <h1>
            Available applications {` `}
            <span className="list-size">{_.size(listed)}</span>
          </h1>
          {listed.length > 0 ? (
            <div className="flex flex-column">
              <ReactTable
                data={_.values(lApplications)}
                columns={this.state.schema}
                filterable={true}
                defaultPageSize={5}
                className="-striped -highlight"
                defaultFilterMethod={(filter, row) =>
                  String(row[filter.id])
                    .toLowerCase()
                    .indexOf(filter.value.toLowerCase()) >= 0
                }
              />
            </div>
          ) : (
            <div />
          )}
        </div>
        {selected.length > 0 ? (
          <div className="form-actions form-group flex justify-end">
            <button type="button" onClick={e => this.create(e)}>
              Create bundle
              <i className="fa fa-cubes ml2" />
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default view(CreateForm);
