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

const getList = path => {
  return fetch(baseURL + path, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + authStore.token
    }
  })
    .then(response => {
      if (response.status !== 401) {
        return response.json();
      } else {
        messages.messages.push({
          id: Math.random(),
          message:
            'Error: There was an error retrieving data. Please try logging in again',
          level: 'danger'
        });
      }
    })
    .then(result => {
      return result.data;
    })
    .catch(err => console.log(err));
};

export { baseURL, getAuth, getList };
