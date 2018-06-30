import React from 'react';
import Dashboard from './pages/dashboard/index';
import Login from './pages/login/index';
import Signup from './pages/signup/index';

export default [
  {
    ...Dashboard,
    path: '/',
    exact: true
  },
  {
    ...Login,
    path: '/login'
  },
  {
    ...Signup,
    path: '/signup'
  }
];