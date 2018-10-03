import { store } from 'react-easy-state';

const authStore = store({
  isLoggedIn: false,
  currentRole: '',
  token: '',
  messages: [],
  activeList: 'users',
  activeListSize: 0
});

export { authStore };
