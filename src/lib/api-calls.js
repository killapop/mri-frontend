const baseURL =
  window.location.protocol +
  '//' +
  window.location.hostname +
  (process.env.NODE_ENV === 'production' ? ':/api' : ':3001');

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
  applications: '/applications'
};

const getAuth = (method, path, data) => {
  return fetch(baseURL + path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: data
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

export { baseURL, getOptions, postOptions, apiRoutes, getAuth };
