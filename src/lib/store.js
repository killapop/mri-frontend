import { store } from 'react-easy-state';

const authStore = store({
  isLoggedIn: false,
  token: '',
  messages: []
});

export { authStore };
