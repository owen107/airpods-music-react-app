import axios from 'axios';

// Setup API root url
const apiBaseUrl = 'https://node-express-api-jun66.herokuapp.com/api';

let token = null;

// Set up all the http reqeusts wrapper
const requests = {
  get: url =>
    axios.get(`${apiBaseUrl}${url}`),
  post: (url, body) =>
    axios.post(`${apiBaseUrl}${url}`, body)
};

// Set up all the http request wrapper for Auth
const Auth = {
  login: (email, password) =>
    requests.post('/users/login', {user: { email, password }}),
  // POST request - Send info for signing up user
  signup: (username, email, password) =>
    requests.post('/users', {user: { username, email, password }})
};

export default {
  Auth,
  setToken: _token => { token = _token}
};