import React from 'react'
import { Link } from 'react-router-dom'
import './RecipePage.css'
import '../components/recipes/RecipeListItem.css'
import './RecipesInListPage.css'

import ListsApiService from '../services/lists-api-service'
import ListNameForm from '../components/ListNameForm'
import UserContext from '../contexts/UserContext'

export default class RecipesInListPage extends React.Component {
  // display all recipes in a list saved by a user
  static contextType = UserContext
  
  constructor(props) {
    super(props)
    this.toggleEditListName = this.toggleEditListName.bind(this)
    this.handleEditSubmit = this.handleEditSubmit.bind(this)
    this.getListName = this.getListName.bind(this) 
  }

  state = {
    recipes: [],
    list: {},
    editListName: false,
  }

  setList(list) {
    this.setState({ list })
  }

  setRecipes(recipes) {
    this.setState({ recipes })
  }

  getListName() {
    return this.state.list.list_name
  }

  handleEditSubmit(values) {
    ListsApiService.patchList(this.state.list.id, values)
      .then(() => ListsApiService.getListById(this.state.list.id))
      .then(list => this.setList(list))
      .then(() => this.toggleEditListName())
      .catch(error => this.context.setError(error))
  }

  handleDeleteList(e, list_id) {
    e.preventDefault()
    ListsApiService.deleteList(list_id)
      .then(() => this.props.history.goBack())

  }

  toggleEditListName() {
    this.setState({
      ...this.state,
      editListName: !this.state.editListName
    })
  }

  removeRecipeFromList(e, recipe_id) {
    e.preventDefault()
    const list_id = this.props.match.params.list_id
    ListsApiService.deleteRecipeFromList(list_id, recipe_id)
      .then(() => ListsApiService.getRecipesForList(list_id))
      .then(recipes => this.setRecipes(recipes))
      .catch(error => this.context.setError(error))
  }

  //fetch all recipes in list, using list id
  componentDidMount() {
    ListsApiService.getRecipesForList(this.props.match.params.list_id)
      .then(recipes => {
        this.setRecipes(recipes)
      })

    ListsApiService.getListById(this.props.match.params.list_id)
      .then(list => this.setList(list))
      .catch(error => this.context.setError(error))
  }

  createRecipesList() {
    const list = this.state.recipes.map(recipe => (
      <section key={recipe.id} className='recipe-tile'>
        <Link to={`/recipes/${recipe.id}`}>
        <section className='user-list-recipe-item'>
          <img src={recipe.image} alt={recipe.title}></img>
          <h4>{recipe.title}</h4>
        </section>
      </Link>
      <button onClick={(e) => this.removeRecipeFromList(e, recipe.id)}>remove</button>
      </section>
    ))
    return list
  }

  render() {
    return (
      <div className='list-of-recipes'>
        <h2>{this.state.list.list_name}</h2>
        {this.state.editListName &&
         <ListNameForm
          handleSubmit={this.handleEditSubmit}  
          cancelForm={this.toggleEditListName}
          listName={this.getListName}
        />
        }
        {!this.state.editListName && 
         <section className='edit-list'>
          <button onClick={(e) => this.toggleEditListName(e)}>edit name</button>
          <button className='delete'
            onClick={(e) => this.handleDeleteList(e, this.state.list.id)}>delete</button>
       </section> 
        }
        <section className='recipes-list'>
        {this.createRecipesList()}
        </section>
      </div>
    )
  }
}