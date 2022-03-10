import { baseUrlMoviesExplorerApi } from './constants.js';

class Auth {
  constructor(baseUrlMoviesExplorerApi) {
    this._baseUrl = baseUrlMoviesExplorerApi;
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
    .then((res) => { return res.json(); })
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
    .then((res) => { return res.json(); })
  };

  checkToken(jwt) {
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

const auth = new Auth(baseUrlMoviesExplorerApi);
export default auth;