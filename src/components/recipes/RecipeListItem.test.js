import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeListItem.css'

import ReactDOM from 'react-dom'
import RecipeListItem from './RecipeListItem'

it('renders without crashing', () => {
  // first create a DOM element to render the component into
  const div = document.createElement('div');

  // render the component, this is the actual test, if something is wrong it will fail here
  ReactDOM.render(<RecipeListItem />, div);

  // clean up code
  ReactDOM.unmountComponentAtNode(div);
});