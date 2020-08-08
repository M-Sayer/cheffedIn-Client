import React from 'react';
import './SearchBar.css'

import RecipesListContext from '../contexts/RecipesListContext';

import SearchBar from './SearchBar'
import ReactDOM from 'react-dom'

it('renders without crashing', () => {
  // first create a DOM element to render the component into
  const div = document.createElement('div');

  // render the component, this is the actual test, if something is wrong it will fail here
  ReactDOM.render(<SearchBar />, div);

  // clean up code
  ReactDOM.unmountComponentAtNode(div);
});