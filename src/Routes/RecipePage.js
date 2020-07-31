import React from 'react';

import RecipeContext from '../contexts/RecipeContext';
import RecipeApiService from '../services/recipes-api-service';
import Comments from '../components/comments/Comments';


class RecipePage extends React.Component {
  static contextType = RecipeContext;

  componentDidMount() {
    const { recipeId } = this.props.match.params;
    this.context.clearError();
    RecipeApiService.getRecipe(recipeId)
      .then(res => {
        if(!res.ok) {
          throw new Error('something went wrong')
        } return res.json()
      })
      .then(recipe => this.context.setRecipe(recipe))
      .catch(error => this.context.setError(error))
    RecipeApiService.getRecipeComments(recipeId)
    .then(comments => this.context.setComments(comments))
    .catch(error => this.context.setError(error))
  }

  componentWillUnmount() {
    this.context.clearRecipe()
  }

  makeTime(recipe) {
    let minutes = recipe.prep_time_minutes;
    minutes > 0 
      ? minutes = `${minutes} minutes` 
      : minutes = ''

    let tense = '';
    
    let hours = recipe.prep_time_hours;
    hours > 1 
      ? tense='hours' 
      : tense='hour'
      
    let time =``;
    hours > 0 
      ? time=`${hours} ${tense} and ${minutes}` 
      : time = `${minutes}`

    return time
  }

  checkVegetarian(recipe) {
    let vegetarian
    (recipe.vegetarian)
      ? vegetarian = 'yes'
      : vegetarian = 'no'
    
      return vegetarian
  }

  renderRecipe() {
    const recipe = this.context.recipe;
    const time = this.makeTime(recipe);
    const vegetarian = this.checkVegetarian(recipe);
    return (
      <div className='recipe'>
        <section className='recipe-heading'>
          <h1>{recipe.title}</h1>
          <h5>by {recipe.author}</h5>
          <img src={recipe.image} alt={recipe.title} />
        </section>
        <section>
        <h3>about this recipe</h3>
        <p>{recipe.about}</p>
        </section>
        <h3>the details</h3>
        <section className='recipe-info'>
          <p><strong>prep-time: </strong>{time}</p> 
          <p><strong>servings: </strong>{recipe.serving_size}</p>
          <p><strong>vegetarian: </strong>{vegetarian}</p>
          <p><strong>ingredients:</strong></p>
          <ul className='ingredients-list'>
            {recipe.ingredients}
          </ul>
        </section>
        <h3>the steps</h3>
        <section className='recipe-steps'>
          <ul className='recipe-steps'>
            {recipe.steps}
          </ul>
        </section>
      </div>
    )
  }

  RecipeComments

  render() {
    
    return (
     <div className='recipe-full'>
      {this.renderRecipe()}
      <Comments />
     </div>
    )
  }
}

export default RecipePage;