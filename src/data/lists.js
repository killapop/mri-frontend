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
        Cell: ({ roles }) => (
          <div>{_.map(roles, role => <span>{role}</span>)}</div>
        )
      }
    ]
  },
  applications: {
    columns: [
      {
        accessor: 'applicant',
        Header: 'Applicant'
      },
      {
        accessor: 'applicant_email',
        Header: "Applicant's email"
      },
      {
        accessor: 'submitted_on',
        Header: 'Submitted'
      },
      {
        accessor: 'state',
        Header: 'Status'
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
