import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import './RecipeListItem.css'

import ReactDOM from 'react-dom'
import RecipeListItem from './RecipeListItem'

it('renders without crashing', () => {
  // first create a DOM element to render the component into
  const div = document.createElement('div');

  const recipe = {
    id: '1',
    title: 'test',
  }

  // render the component, this is the actual test, if something is wrong it will fail here
  ReactDOM.render(
  <BrowserRouter>
    <RecipeListItem recipe={recipe}/>
  </BrowserRouter>, div); 
  // clean up code
  ReactDOM.unmountComponentAtNode(div);
});