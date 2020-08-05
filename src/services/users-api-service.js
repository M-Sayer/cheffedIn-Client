import config from '../config'
import TokenService from '../services/token-service'

const UsersApiService = {
  getListsForUser(userId) {
    return fetch(`${config.API_ENDPOINT}/users/${userId}/lists`, {
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getToken()}`
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()  
      )
  },
  getRecipesForUser(uid) {
    return fetch(`${config.API_ENDPOINT}/users/${uid}/recipes`, {
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getToken()}`
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()  
      )
  }
}

export default UsersApiService