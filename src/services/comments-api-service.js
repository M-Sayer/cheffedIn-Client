import config from '../config';
import TokenService from '../services/token-service'

const CommentsApiService = {
  createComment(recipeId, message) {
    return fetch(`${config.API_ENDPOINT}/comments`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getToken()}`
      },
      body: JSON.stringify({
        recipe_id: recipeId,
        message: message,
      })
    })
  },
  updateComment(id, newData) {
    return fetch(`${config.API_ENDPOINT}/comments/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getToken()}`
      },
      body: JSON.stringify({message: newData})
    })
  },
  deleteComment(id) {
    return fetch(`${config.API_ENDPOINT}/comments/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getToken()}`
      },
    })
  }
}

export default CommentsApiService;