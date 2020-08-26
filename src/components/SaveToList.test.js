import React, { useState, useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import './SaveToList.css'

import ListsApiService from '../services/lists-api-service'
import CreateNewList from './CreateNewList'

import UserContext from '../contexts/UserContext'

import ReactDOM from 'react-dom'
import SaveToList from './SaveToList'

it('renders without crashing', () => {
  // first create a DOM element to render the component into
  const div = document.createElement('div');

  // render the component, this is the actual test, if something is wrong it will fail here
  ReactDOM.render(<SaveToList />, div);
  // clean up code
  ReactDOM.unmountComponentAtNode(div);
});