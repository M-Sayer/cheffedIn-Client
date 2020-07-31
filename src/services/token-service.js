import config from '../config';
import jwt from 'jsonwebtoken'

const TokenService = {
  saveToken(token) {
    console.log(token)
    window.localStorage.setItem(config.AUTH_TOKEN, token)
  },
  getToken() {
    return window.localStorage.getItem(config.AUTH_TOKEN)
  },
  hasAuthToken() {
    return !!this.getToken()
  },
  getUserIdFromToken() {
    if(this.hasAuthToken()) {
      return jwt.decode(this.getToken()).uid
    }
  }
}

export default TokenService