import config from '../config';

const CommentsApiService = {
  createComment(recipeId, message) {
    return fetch(`${config.API_ENDPOINT}/comments`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        recipe_id: recipeId,
        message: message,
        author_id: 1
      })
    })
  }
}

export default CommentsApiService;