import config from '../config'
import TokenService from '../services/token-service'

const ListsApiService = {
  getRecipesForList(list_id) {
    return fetch(`${config.API_ENDPOINT}/lists/${list_id}`)
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
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
  }
}

export default ListsApiService