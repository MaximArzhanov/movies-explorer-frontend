import { baseUrlMoviesExplorerApi } from './constants.js';

class Auth {
  constructor(baseUrlMoviesExplorerApi) {
    this._baseUrl = baseUrlMoviesExplorerApi;
  }

  // _checkResponse(res) {
  //   if (res.ok) {
  //     return res.json();
  //   }
  //   // return Promise.reject(`Ошибка: ${res.status}`);
  //   return Promise.reject(res);
  // }

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
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then((res) => { return res.json(); })
  };

}

const auth = new Auth(baseUrlMoviesExplorerApi);
export default auth;