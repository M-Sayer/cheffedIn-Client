import React from 'react';
import { Link } from 'react-router-dom'

import TokenService from '../../services/token-service'
import UsersApiService from '../../services/users-api-service'
import UserContext from '../../contexts/UserContext'

export default class PostedRecipes extends React.Component {
  static contextType = UserContext
  //lists of saved recipes

  //posted recipes

  componentDidMount() {
    const uid = TokenService.getUserIdFromToken()
    UsersApiService.getRecipesForUser(uid)
      .then(recipes => this.context.setUserRecipes(recipes))
  }

  renderUserRecipes() {
    const recipes = this.context.userRecipes.map(recipe => (
      <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
        <section className='user-recipe'>
          <h4>{recipe.title}</h4>
        </section>
      </Link>
    ))
    return recipes
  }

  render() {
    return (
      <div className='posted-recipes'>
        <section className='new-recipe'>
          <h3>my recipes</h3>
          <Link to='/create'>
            <button>create recipe</button>
          </Link>
        </section>
        {this.renderUserRecipes()}
      </div>
    )
  }
}