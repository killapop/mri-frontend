import { authStore, messages } from './store';

const baseURL =
  window.location.protocol +
  '//' +
  window.location.hostname +
  (process.env.NODE_ENV === 'production' ? ':/api' : ':3001');

const getAuth = (method, path, body) => {
  return fetch(baseURL + path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body
  })
    .then(response => {
      if (response.status !== 401) {
        return response.json();
      } else {
        console.log(response.status);
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
  console.log(opts);
  return fetch(baseURL + path, opts)
    .then(response => {
      console.log(response.status);
      if (response.status === 204) {
        return { data: response.status };
      }
      if (withAuth && response.status !== 401) {
        return response.json();
      } else if (response.status === 200) {
        return { data: response.status };
      } else {
        messages.messages.push({
          id: Math.random(),
          message:
            'Error: There was an error connecting to the server. Please try logging in again',
          level: 'danger'
        });
        return response.status;
      }
    })
    .then(result => {
      return result.data;
    })
    .catch(err => console.log(err));
};

export { baseURL, getAuth, apiCall };
