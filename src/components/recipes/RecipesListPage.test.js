import React from 'react';
import './RecipesListPage.css'

import RecipeApiService from '../../services/recipes-api-service';
import RecipesListContext from '../../contexts/RecipesListContext';
import RecipeListItem from './RecipeListItem';

import ReactDOM from 'react-dom'
import RecipesListPage from './RecipesListPage'

it('renders without crashing', () => {
  // first create a DOM element to render the component into
  const div = document.createElement('div');

  // render the component, this is the actual test, if something is wrong it will fail here
  const error = ''
  ReactDOM.render(
    <RecipesListContext.Provider value={{
      error,
      filteredRecipes: [],
      clearError: () => {},
    }}>
      <RecipesListPage />
    </RecipesListContext.Provider>
    , div);

  // clean up code
  ReactDOM.unmountComponentAtNode(div);
});