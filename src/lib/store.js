import { store } from '@risingstack/react-easy-state';

const authStore = store({
  token: '',
  user: {},
  activeList: {
    title: 'Users',
    slug: 'users'
  }
});

const messages = store({
  messages: []
});

export { authStore, messages };
