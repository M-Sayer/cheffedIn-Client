import config from '../config';

const RecipeApiService = {
  getRecipes() {
    return fetch(`${config.API_ENDPOINT}/recipes`)
  }
}

export default RecipeApiService;