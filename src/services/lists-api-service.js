import config from '../config'

const ListsApiService = {
  getRecipesForList(list_id) {
    return fetch(`${config.API_ENDPOINT}/lists/${list_id}`)
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }
}

export default ListsApiService