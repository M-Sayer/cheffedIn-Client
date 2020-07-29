import config from '../config';

const RecipeApiService = {
  getRecipes() {
    return fetch(`${config.API_ENDPOINT}/recipes`)
  },
  getRecipe(id) {
    return fetch(`${config.API_ENDPOINT}/recipes/${id}`)
  },
  getRecipeComments(recipeId) {
    return fetch(`${config.API_ENDPOINT}/recipes/${recipeId}/comments`)
    .then(res => 
      (!res.ok)
        ? res.json().then(e => Promise.reject(e)) 
        // why promise reject vs throw new error?
        : res.json() 
    )
  },
  createRecipe(newRecipe) {
    return fetch(`${config.API_ENDPOINT}/recipes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newRecipe)
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e)) 
          // why promise reject vs throw new error?
          : res.json() 
      )
  }
}

export default RecipeApiService;