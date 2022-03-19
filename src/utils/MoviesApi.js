import { baseUrlBeatfilmMovies } from './constants.js';

class MoviesApi {
  constructor(baseUrlBeatfilmMovies) {
    this._baseUrl = baseUrlBeatfilmMovies;
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

const moviesApi = new MoviesApi(baseUrlBeatfilmMovies);
export default moviesApi;