import config from '../config';

const LoginApiService = {
  postCreds(creds) {
    return fetch(`${config.API_ENDPOINT}/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(creds)
    })
  }
} 

export default LoginApiService