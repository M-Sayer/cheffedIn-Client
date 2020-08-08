import React from 'react'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import ListsApiService from '../services/lists-api-service'
import UsersApiService from '../services/users-api-service'
import TokenService from '../services/token-service'
import UserContext from '../contexts/UserContext'

import NewListForm from './NewListForm'
import ReactDOM from 'react-dom'

it('renders without crashing', () => {
  // first create a DOM element to render the component into
  const div = document.createElement('div');

  // render the component, this is the actual test, if something is wrong it will fail here
  ReactDOM.render(<NewListForm />, div);

  // clean up code
  ReactDOM.unmountComponentAtNode(div);
});