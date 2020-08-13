import React, { useContext, useState, useEffect } from 'react';
import './RecipePage.css'

import RecipeContext from '../contexts/RecipeContext';
import UserContext from '../contexts/UserContext'
import TokenService from '../services/token-service';
import RecipeApiService from '../services/recipes-api-service';
import UsersApiService from '../services/users-api-service'

import Comments from '../components/comments/Comments';
import SaveToList from '../components/SaveToList'


const RecipePage = (props) => {

  const [state, setState] = useState({saveRecipe: false})
  const [success, setSuccess] = useState({success: false})
  
  const recipeContext = useContext(RecipeContext)
  const listsContext = useContext(UserContext)

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
      .then(recipe => {
        RecipeApiService.getRecipeComments(recipeId)
          .then(comments => recipeContext.setComments(comments))
          .catch(error => recipeContext.setError(error))
        
        recipeContext.setRecipe(recipe)
        
      })
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

  useEffect(() => {
    setSuccess({success: false})
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

  function handleDeleteRecipe() {
    RecipeApiService.deleteRecipe(props.match.params.recipeId)
      .then(() => props.history.goBack())
  }

  function renderEditRecipe() {
    const uid = TokenService.getUserIdFromToken()
    if(uid === recipeContext.recipe.author_id) {
      return (
        <div className='edit-recipe'>
          <section className='delete-recipe-button'>
            <button
              onClick={handleDeleteRecipe}
            >delete</button>
          </section>
        </div>
      )
    }
  }

  function renderSuccess() {
    return (
      <div className='success-container'>
        <p>Recipe added to list!</p>
      </div>
    )
  }

  function showSuccess() {
    setSuccess({success: true})
    return setTimeout(() => setSuccess({success: false}), 2000) 
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
            {success.success && renderSuccess()}
            {!state.saveRecipe && <button onClick={(e) => handleSaveRecipe(e)}
            >save recipe</button>}
            {state.saveRecipe &&
              <SaveToList
              showSuccess={showSuccess}
              props={props} 
              toggle={toggleSaveRecipe}
              listsContext={listsContext}/>
            }
          </section>
        }
        {renderEditRecipe()}
        <section className='recipe-image'>
          <img src={recipe.image} alt={recipe.title} />
        </section>
        <section className='recipe-about'>
        <h3>about this recipe</h3>
        <p>{recipe.about}</p>
        </section>
        <hr/>
        <h3>the details</h3>
        <section className='recipe-info'>
          <p><i>prep-time: </i>{time}</p> 
          <p><i>servings: </i>{recipe.serving_size}</p>
          <p><i>vegetarian: </i>{vegetarian}</p>
          <p><i>ingredients:</i></p>
          <p className='ingredients-list'>
            {recipe.ingredients}
          </p>
        </section>
        <hr/>
        <h3>the steps</h3>
        <p className='recipe-steps'>
          {recipe.steps}
        </p>
      </div>
    )
  }

    return (
     <div className='recipe-full'>
      {recipeContext.error &&
        <section className='error-container'>
          <p className='error-message'>
          {recipeContext.error.error.message}
          </p>
        </section>
      }
      {renderRecipe()}
      <Comments />
     </div>
    )
}

export default RecipePage;