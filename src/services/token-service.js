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
  clearToken() {
    window.localStorage.removeItem(config.AUTH_TOKEN)
  },
  hasAuthToken() {
    return !!this.getToken()
  },
  getUserIdFromToken() {
    if(this.hasAuthToken()) {
      return jwt.decode(this.getToken()).uid
    }
  },
  getUserNameFromToken() {
    if(this.hasAuthToken()) {
      return jwt.decode(this.getToken()).sub
    }
  }
}

export default TokenService