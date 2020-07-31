import React from 'react';

import SavedLists from '../components/dashboard/PostedRecipes'
import PostedRecipes from '../components/dashboard/PostedRecipes'

export default class UserDash extends React.Component {

  //lists of saved recipes

  //posted recipes

  render() {
    return (
      <div className='user-dashboard'>
        <SavedLists />
        <PostedRecipes />
      </div>
    )
  }
}