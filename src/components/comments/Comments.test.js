import React from 'react';
import './Comments.css'

import RecipeContext from '../../contexts/RecipeContext';
import CommentsApiService from '../../services/comments-api-service';
import RecipesApiService from '../../services/recipes-api-service';
import CommentsForm from './CommentsForm';
import TokenService from '../../services/token-service'

import Comments from './Comments'
import ReactDOM from 'react-dom'

it('renders without crashing', () => {
  // first create a DOM element to render the component into
  const div = document.createElement('div');

  // render the component, this is the actual test, if something is wrong it will fail here
  ReactDOM.render(<Comments />, div);

  // clean up code
  ReactDOM.unmountComponentAtNode(div);
});