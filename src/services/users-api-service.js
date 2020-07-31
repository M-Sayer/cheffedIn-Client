import config from '../config'

const UsersApiService = {
  getListsForUser(userId) {
    return fetch(`${config.API_ENDPOINT}/users/${userId}/lists`)
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()  
      )
  },
}

export default UsersApiService