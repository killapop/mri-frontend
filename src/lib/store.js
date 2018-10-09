import { store } from 'react-easy-state';

const authStore = store({
  isLoggedIn: false,
  currentRole: '',
  token: '',
  activeList: {
    title: 'Project Proposals',
    slug: 'projectproposals',
    size: 0
  }
});

const messages = store({
  messages: []
});

export { authStore, messages };
