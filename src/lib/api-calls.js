const en = process.env;
const baseURL =
  en.NODE_ENV === 'development'
    ? 'http://devs:3001'
    : `http://${en.API_PATH}:${en.API_PORT}`;

const getOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

const postOptions = {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  redirect: 'follow',
  referrer: 'no-referrer',
  body: {}
};

const apiRoutes = {
  auth: '/users',
  application_lists: '/'
};

export { baseURL, getOptions, postOptions, apiRoutes };
