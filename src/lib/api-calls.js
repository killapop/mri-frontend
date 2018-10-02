/* eslint-disable */

// Load dummy data for lack of api access.
const allData = require('./data.js');
const en = process.env;
let appData = {};
const baseURL =
  en.NODE_ENV === 'development'
    ? 'http://devs:3001'
    : `http://${en.API_PATH}:${en.API_PORT}`;

const postOptions = {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  redirect: 'follow',
  referrer: 'no-referrer'
};

const apiRoutes = {
  auth: '/users'
};

function getToken(data) {
  console.log(baseURL);
  console.log('data:', data);
  return fetch(baseURL + '/users', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(result => JSON.stringify(result))
    .catch(err => console.log(err));
}

export { baseURL, postOptions, apiRoutes };
