import React from 'react'
import { Link } from 'react-router-dom'

import ListsApiService from '../services/lists-api-service'

export default class RecipesInListPage extends React.Component {
  // display all recipes in a list saved by a user
  state = {
    recipes: [],
  }

  //fetch all recipes in list, using list id
  componentDidMount() {
    ListsApiService.getRecipesForList(this.props.match.params.list_id)
      .then(recipes => {
        this.setState({
          recipes: recipes
        })
      })
  }

  createRecipesList() {
    const list = this.state.recipes.map(recipe => (
      <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
        <section className='user-list-recipe-item'>
          <img src={recipe.image} alt={recipe.title}></img>
          <h4>{recipe.title}</h4>
        </section>
      </Link>
    ))
    return list
  }

  render() {
    return (
      <div className='list-of-recipes'>
        {this.createRecipesList()}
      </div>
    )
  }
}