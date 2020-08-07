import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './CreateRecipePage.css'

import UnsplashSearch from '../components/Unsplash/UnsplashSearch'

import RecipesApiService from '../services/recipes-api-service';

import ReactDOM from 'react-dom'
import CreateRecipePage from './CreateRecipePage'

it('renders without crashing', () => {
  // first create a DOM element to render the component into
  const div = document.createElement('div');

  // render the component, this is the actual test, if something is wrong it will fail here
  ReactDOM.render(<CreateRecipePage />, div);

  // clean up code
  ReactDOM.unmountComponentAtNode(div);
});