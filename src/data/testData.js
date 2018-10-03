export { users, userSchema } from './users_testData.js';

export const sessionFilters = [
  {
    states: ['Facilitator', 'Organisation', 'Beneficiary'],
    title: 'Roles',
    sessionItem: 'activeRole'
  }
];

export const roles = ['Facilitator', 'Organisation', 'Beneficiary'];

export const userStates = ['logged in', 'logged out'];

export const userLinks = [
  {
    label: 'Account',
    path: '/user',
    Icon: 'user-circle'
  },
  {
    label: 'Dashboard',
    path: '/dashboard',
    Icon: 'tachometer-alt'
  },
  {
    label: 'Info',
    path: '/info',
    Icon: 'info-circle'
  },
  {
    label: 'Help',
    path: '/help',
    Icon: 'question-circle'
  }
];

export const badges = [
  {
    title: 'Users',
    icon: 'users',
    types: [
      {
        title: 'Organisations',
        value: 33
      },
      {
        title: 'Beneficiaries',
        value: 104
      },
      {
        title: 'Facilitators',
        value: 5
      }
    ]
  },
  {
    title: 'Project proposals',
    icon: 'project-diagram',
    types: [
      {
        title: 'Submitted',
        value: 16
      },
      {
        title: 'Bundled',
        value: 33
      }
    ]
  },
  {
    title: 'Personal statements',
    icon: 'id-card-alt',
    types: [
      {
        title: 'Submitted',
        value: 133
      },
      {
        title: 'Bundled',
        value: 201
      }
    ]
  },
  {
    title: 'Bundles',
    icon: 'cubes',
    types: [
      {
        title: 'Submitted',
        value: 5
      },
      {
        title: 'Validated',
        value: 8
      },
      {
        title: 'Assessed',
        value: 9
      },
      {
        title: 'Accepted',
        value: 3
      },
      {
        title: 'Rejected',
        value: 6
      }
    ]
  }
];

export const listData = {
  users: {
    columns: ['email', 'type'],
    data: [
      {
        email: 'boo@baaa.com',
        type: 'Organisation',
        first_name: 'Haa',
        last_name: 'hooo'
      },
      {
        email: 'cats@dogs.com',
        type: 'Artist'
      },
      {
        email: 'boo@baaa.com',
        type: 'Organisation'
      },
      {
        email: 'boo@baaa.com',
        type: 'Artist'
      }
    ]
  },
  projectproposals: {
    columns: ['email', 'type'],
    data: [
      {
        email: 'boo@baaa.com',
        type: 'Organisation'
      },
      {
        email: 'cats@dogs.com',
        type: 'Artist'
      },
      {
        email: 'boo@baaa.com',
        type: 'Organisation'
      },
      {
        email: 'boo@baaa.com',
        type: 'Artist'
      }
    ]
  },
  bundles: {
    columns: ['email', 'type'],
    data: [
      {
        email: 'boo@baaa.com',
        type: 'Organisation'
      },
      {
        email: 'cats@dogs.com',
        type: 'Artist'
      },
      {
        email: 'boo@baaa.com',
        type: 'Organisation'
      },
      {
        email: 'boo@baaa.com',
        type: 'Artist'
      }
    ]
  },
  personalstatements: {
    columns: ['email', 'type'],
    data: [
      {
        email: 'boo@baaa.com',
        type: 'Organisation'
      },
      {
        email: 'cats@dogs.com',
        type: 'Artist'
      },
      {
        email: 'boo@baaa.com',
        type: 'Organisation'
      },
      {
        email: 'boo@baaa.com',
        type: 'Artist'
      }
    ]
  }
};
