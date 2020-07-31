import React from 'react'
import { Link } from 'react-router-dom'

import ListsApiService from '../services/lists-api-service'

export default class RecipesInListPage extends React.Component {
  // display all recipes in a list saved by a user
  state = {
    recipes: [],
    list: {},
    editListName: false,
  }

  setList(list) {
    this.setState({ list })
  }

  //fetch all recipes in list, using list id
  componentDidMount() {
    ListsApiService.getRecipesForList(this.props.match.params.list_id)
      .then(recipes => {
        this.setState({
          recipes: recipes
        })
      })

    ListsApiService.getListById(this.props.match.params.list_id)
      .then(list => this.setList(list))
      .catch(error => console.log(error))
  }

  createRecipesList() {
    const list = this.state.recipes.map(recipe => (
      <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
        <section className='user-list-recipe-item'>
          <img src={recipe.image} alt={recipe.title}></img>
          <h4>{recipe.title}</h4>
        </section>
        <button>remove</button>
      </Link>
    ))
    return list
  }

  render() {
    return (
      <div className='list-of-recipes'>
        <h2>{this.state.list.list_name}</h2>
        <button>edit name</button>
        <section className='recipesList'>
        {this.createRecipesList()}
        </section>
      </div>
    )
  }
}