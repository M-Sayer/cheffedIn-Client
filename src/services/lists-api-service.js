import config from '../config'
import TokenService from '../services/token-service'

const ListsApiService = {
  getRecipesForList(list_id) {
    return fetch(`${config.API_ENDPOINT}/lists/${list_id}/recipes`)
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  deleteRecipeFromList(list_id, recipe_id) {
    return fetch(`${config.API_ENDPOINT}/lists/${list_id}/recipes/${recipe_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getToken()}`
      }
    })
  },
  postRecipeToList(list_id, recipe_id, newData) {
    return fetch(`${config.API_ENDPOINT}/lists/${list_id}/recipes/${recipe_id}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getToken()}`
      },
      body: JSON.stringify(newData)
    })
  },
  postList(newList) {
    return fetch(`${config.API_ENDPOINT}/lists`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getToken()}`
      },
      body: JSON.stringify(newList)
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  deleteList(list_id) {
    return fetch(`${config.API_ENDPOINT}/lists/${list_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getToken()}`
      },
    })  
  },
  patchList(list_id, newData) {
    return fetch(`${config.API_ENDPOINT}/lists/${list_id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getToken()}`
      },
      body: JSON.stringify(newData)
    })
  },
  getListById(list_id) {
    return fetch(`${config.API_ENDPOINT}/lists/${list_id}`)
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }
}

export default ListsApiService