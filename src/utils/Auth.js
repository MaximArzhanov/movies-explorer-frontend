import { BASE_URL_MOVIES_EXPLORER_API } from './config'

class Auth {
  constructor(BASE_URL_MOVIES_EXPLORER_API) {
    this._baseUrl = BASE_URL_MOVIES_EXPLORER_API;
  }

  register(name, email, password) {
    return fetch(`${this._baseUrl}signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
    .then((res) => { return res; })
  };

  authorization(email, password) {
    return fetch(`${this._baseUrl}signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then((res) => { return res; })
  };

  getContent(jwt) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${jwt}`
      }
    })
    .then((res) => { return res.json(); })
  };

}

const auth = new Auth(BASE_URL_MOVIES_EXPLORER_API);
export default auth;