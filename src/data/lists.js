export const listSchema = {
  activations: {
    columns: [
      {
        accessor: 'id',
        Header: 'ID'
      },
      {
        accessor: 'email',
        Header: 'Email'
      }
    ]
  },
  users: {
    columns: [
      {
        accessor: 'id',
        Header: 'ID'
      },
      {
        accessor: 'email',
        Header: 'Email'
      },
      {
        accessor: 'name',
        Header: 'Name'
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
