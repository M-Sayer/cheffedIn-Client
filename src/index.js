import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

import { RecipesListProvider } from './contexts/RecipesListContext';
import { RecipeProvider } from './contexts/RecipeContext';
import { UserProvider } from './contexts/UserContext';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <RecipesListProvider>
      <UserProvider>
        <RecipeProvider>
          <App />
        </RecipeProvider>
      </UserProvider>
    </RecipesListProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
