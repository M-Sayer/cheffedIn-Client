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
  },
  updateComment(id, newData) {
    return fetch(`${config.API_ENDPOINT}/comments/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({message: newData})
    }) //why - should i verify response?
    
  }
}

export default CommentsApiService;