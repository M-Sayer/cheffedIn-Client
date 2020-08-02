import React from 'react'
import { Link } from 'react-router-dom'

import ListsApiService from '../services/lists-api-service'
import ListNameForm from '../components/ListNameForm'

export default class RecipesInListPage extends React.Component {
  // display all recipes in a list saved by a user
  constructor(props) {
    super(props)
    this.toggleEditListName = this.toggleEditListName.bind(this)
    this.handleEditSubmit = this.handleEditSubmit.bind(this)
  }

  state = {
    recipes: [],
    list: {},
    editListName: false,
  }

  setList(list) {
    this.setState({ list })
  }

  handleEditSubmit(values) {
    ListsApiService.patchList(this.state.list.id, values)
      .then(() => ListsApiService.getListById(this.state.list.id))
      .then(list => this.setList(list))
      .then(() => this.toggleEditListName())
      .catch(error => console.log(error))
  }

  toggleEditListName() {
    this.setState({
      ...this.state,
      editListName: !this.state.editListName
    })
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
        {this.state.editListName &&
         <ListNameForm
          handleSubmit={this.handleEditSubmit}  
          cancelForm={this.toggleEditListName}
        />
        }
        {!this.state.editListName && 
        <button onClick={(e) => this.toggleEditListName(e)}>edit name</button>}
        <section className='recipesList'>
        {this.createRecipesList()}
        </section>
      </div>
    )
  }
}