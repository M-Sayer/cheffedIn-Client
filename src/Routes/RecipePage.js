import React, { useContext, useState, useEffect } from 'react';

import RecipeContext from '../contexts/RecipeContext';
import UserListsContext from '../contexts/UserListsContext'
import TokenService from '../services/token-service';
import RecipeApiService from '../services/recipes-api-service';
import UsersApiService from '../services/users-api-service'

import Comments from '../components/comments/Comments';
import SaveToList from '../components/SaveToList'


const RecipePage = (props) => {

  const [state, setState] = useState({saveRecipe: false})
  
  const recipeContext = useContext(RecipeContext)
  const listsContext = useContext(UserListsContext)

  useEffect(() => {
    const { recipeId } = props.match.params;
    recipeContext.clearError();
    RecipeApiService.getRecipe(recipeId)
      .then(res => {
        if(!res.ok) {
          throw new Error('something went wrong')
        } return res.json()
        //render comments conditionally
      })
      .then(recipe => recipeContext.setRecipe(recipe))
      .catch(error => recipeContext.setError(error))
    RecipeApiService.getRecipeComments(recipeId)
    .then(comments => recipeContext.setComments(comments))
    .catch(error => recipeContext.setError(error))
  }, [])

  useEffect(() => {
    if(TokenService.hasAuthToken()) {
      const uid = TokenService.getUserIdFromToken()
      listsContext.clearError()
      UsersApiService.getListsForUser(uid)
        .then(lists => listsContext.setUserLists(lists))
        .catch(error => listsContext.setError)
    }
  }, [])

  function makeTime(recipe) {
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

  function checkVegetarian(recipe) {
    let vegetarian
    (recipe.vegetarian)
      ? vegetarian = 'yes'
      : vegetarian = 'no'
    
      return vegetarian
  }

  function toggleSaveRecipe() {
    setState({ saveRecipe: !state.saveRecipe})
  }

  function handleSaveRecipe(e) {
    e.preventDefault()
    toggleSaveRecipe()
  }

  function renderRecipe() {
    const recipe = recipeContext.recipe;
    const time = makeTime(recipe);
    const vegetarian = checkVegetarian(recipe);
    return (
      <div className='recipe'>
        <section className='recipe-heading'>
          <h1>{recipe.title}</h1>
          <h5>by {recipe.author}</h5>
        </section>
        {TokenService.hasAuthToken() &&
          <section className='save-recipe'>
            {!state.saveRecipe && <button onClick={(e) => handleSaveRecipe(e)}
            >save recipe</button>}
            {state.saveRecipe &&
              <SaveToList listsContext={listsContext}/>
            }
          </section>
        }
        <section className='recipe-image'>
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

    return (
     <div className='recipe-full'>
      {renderRecipe()}
      <Comments />
     </div>
    )
}

export default RecipePage;