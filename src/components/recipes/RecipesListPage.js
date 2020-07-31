import React from './node_modules/react';

import RecipeApiService from '../services/recipes-api-service';
import RecipesListContext from '../contexts/RecipesListContext';
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
    return recipesList.map(recipe => 
      <RecipeListItem
        key={recipe.id}
        recipe={recipe}
      />  
      )
  }

  render() {
    const { error } = this.context;
    return (
      <div className='RecipeList'>
        {error
          ? <p>error</p>
          : this.renderRecipes()
        }
        
      </div>
      
    )
  }
}

export default RecipesListPage;