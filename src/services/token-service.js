import config from '../config';
import jwtDecode from 'jwt-decode';
import jwt from 'jsonwebtoken'

const TokenService = {
  saveToken(token) {
    console.log(token)
    window.localStorage.setItem(config.AUTH_TOKEN, token)
  },
  getToken() {
    return window.localStorage.getItem(config.AUTH_TOKEN)
  },
  getUserIdFromToken() {
    if(this.getToken() !== null) {
      return jwt.decode(this.getToken()).uid
    }
  }
}

export default TokenService