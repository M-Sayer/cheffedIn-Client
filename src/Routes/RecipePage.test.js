import React, { useContext, useState, useEffect } from 'react';
import './RecipePage.css'

import RecipeContext from '../contexts/RecipeContext';
import UserContext from '../contexts/UserContext'
import TokenService from '../services/token-service';
import RecipeApiService from '../services/recipes-api-service';
import UsersApiService from '../services/users-api-service'

import Comments from '../components/comments/Comments';
import SaveToList from '../components/SaveToList'
import NewListForm from '../components/NewListForm'

import ReactDOM from 'react-dom'
import RecipePage from './RecipePage'

it('renders without crashing', () => {
  // first create a DOM element to render the component into
  const div = document.createElement('div');

  // render the component, this is the actual test, if something is wrong it will fail here
  ReactDOM.render(<RecipePage match={{params: {recipeId: 1}}}/>, div);

  // clean up code
  ReactDOM.unmountComponentAtNode(div);
});