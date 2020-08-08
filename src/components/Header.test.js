import React from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import './Header.css'

import TokenService from '../services/token-service'
import RecipesListContext from '../contexts/RecipesListContext'

import Header from './Header'
import ReactDOM from 'react-dom'

it('renders without crashing', () => {
  // first create a DOM element to render the component into
  const div = document.createElement('div');

  // render the component, this is the actual test, if something is wrong it will fail here
  ReactDOM.render(
  
  <BrowserRouter>
    <Header />
  </BrowserRouter> , div);

  // clean up code
  ReactDOM.unmountComponentAtNode(div);
});