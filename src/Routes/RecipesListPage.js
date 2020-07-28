import React from 'react';

import RecipeApiService from '../services/recipes-api-service';
import RecipesListContext from '../contexts/RecipesListContext';
import RecipeListItem from '../components/RecipeListItem';

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
      .then(recipes => this.context.setRecipesList(recipes))
      .catch(error => this.context.setError(error))
  }

  //render recipes
  renderRecipes() {
    const recipesList = this.context.recipesList;
    return recipesList.map(recipe => 
      <RecipeListItem
        key={recipe.id}
        recipe={recipe}
      />  
      )
  }

  render() {
   
    return (
      <div className='RecipeList'>
        {this.renderRecipes()}
      </div>
      
    )
  }
}

export default RecipesListPage;