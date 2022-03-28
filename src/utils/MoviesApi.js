import { BASE_URL_BEATFILM_MOVIES_API } from './config'

class MoviesApi {
  constructor(BASE_URL_BEATFILM_MOVIES_API) {
    this._baseUrl = BASE_URL_BEATFILM_MOVIES_API;
  }

  getBeatfilmMovies() {
    return fetch(`${this._baseUrl}`, {
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Ошибка');
    })
  }

}

const moviesApi = new MoviesApi(BASE_URL_BEATFILM_MOVIES_API);
export default moviesApi;