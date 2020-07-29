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
  }
}

export default RecipeApiService;