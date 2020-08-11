import React from 'react';
import './UserDash.css'

import SavedLists from '../components/dashboard/SavedLists'
import PostedRecipes from '../components/dashboard/PostedRecipes'
import TokenService from '../services/token-service'
import RecipesContext from '../contexts/RecipesListContext'

export default class UserDash extends React.Component {
  static contextType = RecipesContext
  //lists of saved recipes

  //posted recipes

  createWelcome() {
    const userName = TokenService.getUserNameFromToken()
    return (
      <h2>Welcome {userName}</h2>
    )
  }

  logOutUser() {
    TokenService.clearToken()
    this.context.setLoggedIn(false)
  }

  renderLogout() {
    return (
        <button className='logout-button'
          onClick={() => {
            this.logOutUser()
            this.props.history.push('/')
        }}> Logout
        </button>
    )
  }

  render() {
    return (
      <div className='user-dashboard'>
        <section className='dashboard-header'>
          {this.createWelcome()}
          {this.context.isLoggedIn && this.renderLogout()}
        </section>
        <section className='dash-container'>
          <SavedLists />
          <PostedRecipes />
        </section>
      </div>
    )
  }
}