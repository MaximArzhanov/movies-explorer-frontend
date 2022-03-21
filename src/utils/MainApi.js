import { baseUrlMoviesExplorerApi } from './constants.js';

class MainApi {
  constructor(baseUrlMoviesExplorerApi) {
    this._baseUrl = baseUrlMoviesExplorerApi;
  }

  getUserInformation(jwt) {
    return fetch(`${this._baseUrl}users/me`, {
      headers: {
        "Authorization" : `Bearer ${jwt}`,
      }
    })
    .then((res) => { return res; })
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

  getMovies(jwt) {
    return fetch(`${this._baseUrl}movies`, {
      headers: {
        "Authorization" : `Bearer ${jwt}`,
      }
    })
    .then((res) => { return res })
  }

  /** Сохраняет фильм в базе данных */
  saveMovie(movie, jwt) {
    return fetch(`${this._baseUrl}movies`, {
      method: 'POST',
      headers: {
        "Authorization" : `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie)
    })
    .then((res) => { return res })
  }

}

const mainApi = new MainApi(baseUrlMoviesExplorerApi);
export default mainApi;