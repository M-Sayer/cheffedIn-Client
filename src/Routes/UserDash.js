import React from 'react';
import './UserDash.css'

import SavedLists from '../components/dashboard/SavedLists'
import PostedRecipes from '../components/dashboard/PostedRecipes'
import TokenService from '../services/token-service'

export default class UserDash extends React.Component {

  //lists of saved recipes

  //posted recipes

  createWelcome() {
    const userName = TokenService.getUserNameFromToken()
    return (
      <h2>Welcome {userName}</h2>
    )
  }

  render() {
    return (
      <div className='user-dashboard'>
        {this.createWelcome()}
        <section className='dash-container'>
          <SavedLists />
          <PostedRecipes />
        </section>
      </div>
    )
  }
}