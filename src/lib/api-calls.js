import { authStore } from './store';
import { add as addMessage } from './message';

const baseURL =
  window.location.protocol +
  '//' +
  window.location.hostname +
  (process.env.NODE_ENV === 'production' ? '/api' : ':3001');

const getAuth = (method, path, body) => {
  return fetch(baseURL + path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body
  })
    .then(response => {
      if (response.status !== 401) {
        return response.json();
      }
    })
    .then(result => {
      return result.data;
    })
    .catch(err => console.log(err));
};

const apiCall = (method, path, body, withAuth) => {
  const opts = Object.assign({
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (method !== 'GET') {
    Object.assign(opts, { body });
  }
  if (withAuth) {
    Object.assign(opts.headers, { Authorization: 'Bearer ' + authStore.token });
  }
  return fetch(baseURL + path, opts)
    .then(response => {
      if (response.status === 204) {
        return { data: response.status };
      }
      if (withAuth && response.status !== 401) {
        return response.json();
      } else if (response.status === 200) {
        return { data: response.status };
      } else {
        addMessage('danger', 'There was a problem authenticating.');
        return { data: response.status.json() };
      }
    })
    .then(result => {
      return result.data;
    })
    .catch(err => {
      console.log(err);
      addMessage(
        'danger',
        'There was a problem connecting to the server. Please try again after some time or contact us info@mri-application.de'
      );
    });
};

export { baseURL, getAuth, apiCall };
