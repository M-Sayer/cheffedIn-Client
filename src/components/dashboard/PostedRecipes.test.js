import React from 'react';
import { Link, BrowserRouter } from 'react-router-dom'

import TokenService from '../../services/token-service'
import UsersApiService from '../../services/users-api-service'
import UserContext from '../../contexts/UserContext'

import PostedRecipes from './PostedRecipes'
import ReactDOM from 'react-dom'

it('renders without crashing', () => {
  // first create a DOM element to render the component into
  const div = document.createElement('div');

  // render the component, this is the actual test, if something is wrong it will fail here
  ReactDOM.render(
  
  <BrowserRouter>
    <PostedRecipes />
  </BrowserRouter> , div);

  // clean up code
  ReactDOM.unmountComponentAtNode(div);
});