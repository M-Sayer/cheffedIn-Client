import React from 'react';

import RecipesListPage from '../components/recipes/RecipesListPage';
import SearchBar from '../components/SearchBar';
import DemoLanding from '../components/DemoLanding'

export default class Home extends React.Component {


  render() {
    return (
      <div className='home-page'>
        <DemoLanding />
        <SearchBar />
        <RecipesListPage history={this.props.history}/>
      </div>
    )
  }
}