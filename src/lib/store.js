import { store } from 'react-easy-state';

const authStore = store({
  isLoggedIn: false,
  currentRole: '',
  token: '',
  messages: []
});

export { authStore };
