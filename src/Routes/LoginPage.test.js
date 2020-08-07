import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import LoginApiService from '../services/login-api-service'
import TokenService from '../services/token-service'
import RecipesListContext from '../contexts/RecipesListContext'

import ReactDOM from 'react-dom'
import LoginPage from './LoginPage'

it('renders without crashing', () => {
  // first create a DOM element to render the component into
  const div = document.createElement('div');

  // render the component, this is the actual test, if something is wrong it will fail here
  ReactDOM.render(<LoginPage />, div);

  // clean up code
  ReactDOM.unmountComponentAtNode(div);
});