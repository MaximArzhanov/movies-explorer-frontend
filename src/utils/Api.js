import { baseUrlMoviesExplorerApi } from './constants.js';

class Api {
  constructor(baseUrlMoviesExplorerApi) {
    this._baseUrl = baseUrlMoviesExplorerApi;
  }

  getUserInformation(jwt) {
    return fetch(`${this._baseUrl}users/me`, {
      headers: {
        "Authorization" : `Bearer ${jwt}`,
      }
    })
    .then((res) => { return res.json(); })
  }

  updateUserInformation(nameUser, emailUser, jwt) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        "Authorization" : `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameUser,
        email: emailUser
      })
    })
    .then((res) => { return res; })
  }

}

const api = new Api(baseUrlMoviesExplorerApi);
export default api;