import React from 'react';
import { Link, BrowserRouter } from 'react-router-dom';

import UsersApiService from '../../services/users-api-service';
import TokenService from '../../services/token-service';
import NewListForm from '../../components/NewListForm';
import UserContext from '../../contexts/UserContext';

import SavedLists from './SavedLists';
import ReactDOM from 'react-dom';

it('renders without crashing', () => {
  // first create a DOM element to render the component into
  const div = document.createElement('div');

  // render the component, this is the actual test, if something is wrong it will fail here
  ReactDOM.render(
  
  <BrowserRouter>
    <SavedLists />
  </BrowserRouter> , div);

  // clean up code
  ReactDOM.unmountComponentAtNode(div);
});