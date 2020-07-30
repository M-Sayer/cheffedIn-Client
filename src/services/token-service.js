import config from '../config';

const TokenService = {
  saveToken(token) {
    console.log(token)
    window.localStorage.setItem(config.AUTH_TOKEN, token)
  },
  getToken() {
    return window.localStorage.getItem(config.AUTH_TOKEN)
  }
}

export default TokenService