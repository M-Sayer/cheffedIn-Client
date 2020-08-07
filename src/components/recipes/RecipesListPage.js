import React from 'react';
import { Link } from 'react-router-dom'
import './RecipesListPage.css'

import RecipeApiService from '../../services/recipes-api-service';
import RecipesListContext from '../../contexts/RecipesListContext';
import RecipeListItem from './RecipeListItem';

class RecipesListPage extends React.Component {
  static contextType = RecipesListContext;

  //load articles
  componentDidMount() {
    this.context.clearError()
    RecipeApiService.getRecipes()
      .then(res => {
        if(!res.ok) {
          throw new Error('something went wrong')
        } return res.json()
      })
      .then(this.context.setRecipesList)
      .catch(error => this.context.setError(error))
  }

  //render recipes
  renderRecipes() {
    const recipesList = this.context.filteredRecipes;
    if(recipesList.length > 0) {
      return recipesList.map(recipe => 
        <RecipeListItem
          key={recipe.id}
          recipe={recipe}
        />  
        )
    } return (
      <div className='no-recipes'>
        <h2>Sorry, no results found.</h2>
        <p>But you can upload a recipe here:</p>
        <Link to='/create'>Upload Recipe</Link>
      </div>
    )
    
  }

  render() {
    const { error } = this.context;
    return (
      <div className='recipes-list'>
        {error
          ? <p>error</p>
          : this.renderRecipes()
        }
        
      </div>
      
    )
  }
}

export default RecipesListPage;