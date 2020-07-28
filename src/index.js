import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

import { RecipesListProvider } from './contexts/RecipesListContext';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <RecipesListProvider>
      <App />
    </RecipesListProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
