import { BASE_URL_IMAGE, DURATION_SHORT_MOVIE, MESSAGE_NEED_ENTER_KEYWORD } from './config'

/** Фильтрует массив с фильмами по ключевому слову и чекбоксу */
function searchMovies(allMovies, keyWord, checkboxOnlyShortMovies) {
  let arrayMovies = [];

  if (!allMovies) return arrayMovies;

  if (keyWord === '*') { // Если введён символ "*", то отображаются все фильмы
    arrayMovies = checkboxOnlyShortMovies
      ? allMovies.filter((movie) => { return (movie.duration < DURATION_SHORT_MOVIE); })
      : allMovies;
  }
  else {
    arrayMovies = checkboxOnlyShortMovies
      ? allMovies.filter((movie) => {
        return (movie.duration < DURATION_SHORT_MOVIE
              && movie.nameRU.toUpperCase().includes(keyWord.toUpperCase()));
      })
      : allMovies.filter((movie) => {
        return (movie.nameRU.toUpperCase().includes(keyWord.toUpperCase()));
      })
  }

  return arrayMovies;
}

/** Подготавливает объект для отправки запроса */
function prepareMovieObject({...movie}) {
  const image = BASE_URL_IMAGE.slice(0, -1) + movie.image.url;
  const country = movie.country ? movie.country : MESSAGE_NEED_ENTER_KEYWORD;
  const nameEN = movie.nameEN ? movie.nameEN : MESSAGE_NEED_ENTER_KEYWORD;
  const nameRU = movie.nameRU ? movie.nameRU : MESSAGE_NEED_ENTER_KEYWORD;
  const director = movie.director ? movie.director : MESSAGE_NEED_ENTER_KEYWORD;
  const description = movie.description ? movie.description : MESSAGE_NEED_ENTER_KEYWORD;
  const duration = movie.duration ? movie.duration : MESSAGE_NEED_ENTER_KEYWORD;
  const movieId = movie.id;
  const thumbnail = image;
  const trailerLink = movie.trailerLink ? movie.trailerLink : image;
  delete movie.id;
  delete movie.created_at;
  delete movie.updated_at;
  return {...movie, image, thumbnail, country, movieId, nameEN, nameRU, trailerLink, director, description, duration};
}

/** Фильтрует фильмы сохранённые текущим пользователем */
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

/** Выполняется в случае прихода ошибки от Api */
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

/** Проверяет email на соответствие формату */
function checkEmailIsFormat(email) {
  const regex = /[\w-]{2,}@[\w]{2,}\.[\w]{2,}/
  return regex.test(email);
}

export {
  searchMovies,
  prepareMovieObject,
  findMoviesCreatedByCurrentUser,
  returnMessageFromApi,
  performErrorResponse,
  checkEmailIsFormat
}