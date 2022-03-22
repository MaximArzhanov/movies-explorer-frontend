import {
  baseUrlMoviesExplorerApi,
  baseUrlBeatfilmMovies,
  baseUrlForImage
} from './constants.js';

/** Фильтрует массив с фильмами по ключевому слову и чекбоксу */
function searchMovies(allMovies, keyWord, checkboxOnlyShortMovies) {
  let arrayMovies = [];

  if (!allMovies) return arrayMovies;

  if (keyWord === '*') { // Если введён символ "*", то отображаются все фильмы
    arrayMovies = checkboxOnlyShortMovies
      ? allMovies.filter((movie) => { return (movie.duration < 40); })
      : allMovies;
  }
  else {
    arrayMovies = checkboxOnlyShortMovies
      ? allMovies.filter((movie) => {
        return (movie.duration < 40 && movie.nameRU.toUpperCase().includes(keyWord.toUpperCase()));
      })
      : allMovies.filter((movie) => {
        return (movie.nameRU.toUpperCase().includes(keyWord.toUpperCase()));
      })
  }

  return arrayMovies;
}

/** Подготавливает объект для отправки запроса */
function prepareMovieObject({...movie}) {
  const image = baseUrlForImage.slice(0, -1) + movie.image.url;
  const country = movie.country ? movie.country : 'Нет информации';
  const movieId = movie.id;
  const thumbnail = image;
  delete movie.id;
  delete movie.created_at;
  delete movie.updated_at;
  return {...movie, image, thumbnail, country, movieId};
}

function findMoviesCreatedByCurrentUser(movies, currentUserId) {
  const moviesOfCurrentUser = movies.filter(movie => movie.owner === currentUserId);
  return moviesOfCurrentUser;
}

function returnMessageFromApi(data) {
  try { // Если приходит ошибка валидации от Celebrate/Joi
    if (data.validation.body.message) {
      return Promise.reject(data.validation.body.message);
    }
  }
  catch (err) {
    if (data.message) {
      return Promise.reject(data.message);
    }
  }
}

function performErrorResponse(res, handleMessageFromApi) {
  res.json()
  .then((data) => {
    returnMessageFromApi(data)
      .catch((err) => {
        console.error(err);
        handleMessageFromApi(err);
      });
  })
  .catch((err) => { console.error(err); });
}

export {
  searchMovies,
  prepareMovieObject,
  findMoviesCreatedByCurrentUser,
  returnMessageFromApi,
  performErrorResponse
}