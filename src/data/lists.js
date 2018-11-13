/* eslint-disable react/react-in-jsx-scope */

import moment from 'moment';
import _ from 'lodash';
import React from 'react';

const formatDate = date => moment(date).format('DD.MM.YYYY');

export const listSchema = {
  activations: {
    columns: [
      {
        accessor: 'email',
        Header: 'Email'
      },
      {
        accessor: 'token',
        Header: 'Token'
      },
      {
        accessor: 'password',
        Header: 'Password'
      },
      {
        accessor: 'createAt',
        Header: 'Created at',
        Cell: row => formatDate(row.value)
      },
      {
        accessor: 'expiresAt',
        Header: 'Expires at',
        Cell: row => formatDate(row.value)
      },
      {
        accessor: 'isValid',
        Header: 'Valid',
        Cell: row => (
          <span style={{ color: row.value ? '#3a6' : '#a33' }}>
            <i
              className={`mr2 fa fa-15x fa-${row.value ? 'check' : 'times'}`}
            />
            {row.value ? 'valid' : 'not valid'}
          </span>
        ),
        filterMethod: (filter, row) => {
          if (filter.value !== 'all') {
            return row[filter.id] === JSON.parse(filter.value);
          } else {
            return row;
          }
        },
        Filter: ({ filter, onChange }) => (
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: '100%' }}
            value={filter ? filter.value : 'all'}>
            <option value="all">Show All</option>
            <option value="true">Valid</option>
            <option value="false">Not Valid</option>
          </select>
        )
      },
      {
        accessor: 'isActive',
        Header: 'Active',
        Cell: row => (
          <span style={{ color: row.value ? '#3a6' : '#a33' }}>
            <i
              className={`mr2 fa fa-15x fa-${row.value ? 'check' : 'times'}`}
            />
            {row.value ? 'active' : 'inactive'}
          </span>
        ),
        filterMethod: (filter, row) => {
          if (filter.value !== 'all') {
            return row[filter.id] === JSON.parse(filter.value);
          } else {
            return row;
          }
        },
        Filter: ({ filter, onChange }) => (
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: '100%' }}
            value={filter ? filter.value : 'all'}>
            <option value="all">Show All</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        )
      }
    ]
  },
  users: {
    columns: [
      {
        accessor: 'email',
        Header: 'Email'
      },
      {
        accessor: 'name',
        Header: 'Name'
      },
      {
        accessor: 'roles',
        Header: 'Roles',
        Cell: row => (
          <div>
            {_.map(row.value, (role, key) => {
              return (
                <span
                  key={key}
                  className="mr2 br2 ph2 pv1 gray f6  bg-white shadow-light">
                  {role}
                </span>
              );
            })}
          </div>
        ),
        filterMethod: (filter, row) => {
          if (filter.value !== 'all') {
            if (_.includes(row.roles, filter.value)) {
              return row;
            }
          } else {
            return row;
          }
        },
        Filter: ({ filter, onChange }) => (
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: '100%' }}
            value={filter ? filter.value : 'all'}>
            <option value="all">Show All</option>
            <option value="mri-staff">mri-staff</option>
            <option value="organization">organization</option>
            <option value="beneficiary">beneficiary</option>
          </select>
        )
      }
    ]
  },
  applications: {
    columns: [
      {
        accessor: 'id',
        Header: 'Application ID'
      },
      {
        accessor: 'account.email',
        Header: 'Applicant',
      },
      {
        accessor: 'form',
        Header: 'Program line',
        Cell: row => row.row.form.split('-').pop().charAt(0),
        filterMethod: (filter, row) => {
          if (filter.value === 'all') {
            return row;
          } else {
            return row.form.includes(filter.value);
          }
        },
        Filter: ({ filter, onChange }) => (
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: '100%' }}
            value={filter ? filter.value : 'all'}>
            <option value="all">Show All</option>
            <option value="1">Program line 1</option>
            <option value="2">Program line 2</option>
          </select>
        )
      },
      {
        accessor: 'form',
        Header: 'Program line',
        Cell: row => row.row.form.split('-').pop().charAt(0),
        filterMethod: (filter, row) => {
          if (filter.value === 'all') {
            return row;
          } else {
            return row.form.includes(filter.value);
          }
        },
        Filter: ({ filter, onChange }) => (
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: '100%' }}
            value={filter ? filter.value : 'all'}>
            <option value="all">Show All</option>
            <option value="1">Program line 1</option>
            <option value="2">Program line 2</option>
          </select>
        )
      },
      {
        accessor: 'state',
        Header: 'Status',
        filterMethod: (filter, row) => {
          if (filter.value === 'all') {
            return row;
          } else {
            return row[filter.id] === filter.value;
          }
        },
        Filter: ({ filter, onChange }) => (
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: '100%' }}
            value={filter ? filter.value : 'all'}>
            <option value="all">Show All</option>
            <option value="created">Created</option>
            <option value="finalized">Finalized</option>
            <option value="locked">Locked</option>
          </select>
        )
      },
      {
        accessor: 'bundled',
        Header: 'Bundled',
        Cell: row => (
          <span style={{ color: row.value === null ? '#3a6' : '#a33' }}>
            <i
              className={`mr2 fa fa-15x fa-${row.value ? 'check' : 'times'}`}
            />
            {row.value ? 'Bundled' : 'Not bundled'}
          </span>
        ),
        filterMethod: (filter, row) => {
          if (filter.value === 'all') {
            return row;
          } else if (filter.value === 'false') {
            return row[filter.id] !== null;
          } else {
            return row[filter.id] === null;
          }
        },
        Filter: ({ filter, onChange }) => (
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: '100%' }}
            value={filter ? filter.value : 'all'}>
            <option value="all">Show All</option>
            <option value="true">Bundled</option>
            <option value="false">Not bundled</option>
          </select>
        )
      }
    ]
  },
  bundles: {
    columns: [
      {
        accessor: 'bundle_name',
        Header: 'Bundle ID'
      },
      {
        accessor: 'organisation',
        Header: 'Organisation'
      },
      {
        id: 'beneficiaries',
        Header: 'Beneficiarie(s)'
      },
      {
        accessor: 'created_on',
        Header: 'Created'
      },
      {
        accessor: 'state',
        Header: 'State'
      }
    ]
  },
  userList: {
    columns: [
      {
        accessor: 'created_on',
        Header: 'Created'
      },
      {
        accessor: 'updated_on',
        Header: 'Updated'
      },
      {
        accessor: 'state',
        Header: 'Status'
      }
    ]
  }
};
