import React from 'react';
import './RecipesListPage.css'

import RecipeApiService from '../../services/recipes-api-service';
import RecipesListContext from '../../contexts/RecipesListContext';
import RecipeListItem from './RecipeListItem';

class RecipesListPage extends React.Component {
  static contextType = RecipesListContext;

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
        <button onClick={() => this.props.history.push('/create')}>
          Upload Recipe
        </button>
      </div>
    )
    
  }

  render() {
    return (
      <div className='recipes-list'>
        {this.context.error
          ? <p>error</p>
          : this.renderRecipes()
        }
      </div>
    )
  }
}

export default RecipesListPage;