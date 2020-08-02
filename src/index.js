import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

import { RecipesListProvider } from './contexts/RecipesListContext';
import { RecipeProvider } from './contexts/RecipeContext';
import { UserListsProvider } from './contexts/UserListsContext';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <RecipesListProvider>
      <UserListsProvider>
        <RecipeProvider>
          <App />
        </RecipeProvider>
      </UserListsProvider>
    </RecipesListProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
