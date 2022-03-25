import { BASE_URL_MOVIES_EXPLORER_API } from './config'

class MainApi {
  constructor(BASE_URL_MOVIES_EXPLORER_API) {
    this._baseUrl = BASE_URL_MOVIES_EXPLORER_API;
  }

  /** Получает информацию о пользователе */
  getUserInformation(jwt) {
    return fetch(`${this._baseUrl}users/me`, {
      headers: {
        "Authorization" : `Bearer ${jwt}`,
      }
    })
    .then((res) => { return res; })
  }

  /** Обновляет информацию о пользователе */
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

  /** Запрашивает все фильмы из базы данных */
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

  /** Удаляет фильм из базы данных */
  deleteCard(movieId, jwt) {
    return fetch(`${this._baseUrl}movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        "Authorization" : `Bearer ${jwt}`,
        }
      })
      .then((res) => { return res })
  }

}

const mainApi = new MainApi(BASE_URL_MOVIES_EXPLORER_API);
export default mainApi;