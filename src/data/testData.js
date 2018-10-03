import { users } from './users_testData';
import { forms } from './forms_testData';
import { bundles } from './bundles_testData';
import { myforms } from './myforms_testData';

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
  }
];

export const listData = {
  users,
  forms,
  bundles,
  myforms
};
