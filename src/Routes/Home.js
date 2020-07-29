import React from 'react';

import RecipesListPage from '../components/RecipesListPage';
import SearchBar from '../components/SearchBar';

export default class Home extends React.Component {


  render() {
    return (
      <div className='home-page'>
        <SearchBar />
        <RecipesListPage />
      </div>
    )
  }
}