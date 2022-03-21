import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies'
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile'
import Footer from '../Footer/Footer';
import PageNotFound from '../PageNotFound/PageNotFound';
import auth from "../../utils/Auth";
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { baseUrlMoviesExplorerApi } from '../../utils/constants';

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {

  const history = useHistory();

  /** Текущий пользователь */
  const [currentUser, setCurrentUser] = React.useState({});

  /** Стейт для установки темы для Header */
  const [headerThemeBlue, setHeaderThemeBlue] = React.useState(false);

  /** Состояние авторизации */
  const [loggedIn, setLoggedIn] = React.useState(false);

  /** Сообщение от сервера ApiMoviesExplorer */
  const [messageFromApi, setMessageFromApi] = React.useState('');

  /** Массив найденных, при запросе, фильмов (c api beatfilm-movies) */
  const [filteredMovies, setFilteredMovies] = React.useState([]);

  /** Массив сохранённых фильмов */
  const [savedMovies, setSavedMovies] = React.useState([]);

  /** Массив сохранённых фильмов */
  const [savedMovie, setSavedMovie] = React.useState({});

  const [isMoviesWereFound, setIsMoviesWereFound] = React.useState(true);

  function resetMoviesWereFound() {
    setIsMoviesWereFound(true);
  }

  /** Если ранее выполнялся поиск фильма, то при открытии страницы будут отражены
   *  результаты последнего поиска
   */
  function onMoviesPage(data) {
    setFilteredMovies(data);
  }

  function resetMessageFromApi() {
    setMessageFromApi('');
  }

   /** Текущий пользователь */
   const [isLoading, setIsLoading] = React.useState(false);

  function onFormPage() {
    setMessageFromApi('');
  }

  /** Если пользователь на главной странице (Main) то включается синяя тема для Header */
  function onLandingPage(state) {
    setHeaderThemeBlue(state);
  }

  /** Запрашивает информацию о пользователе */
  // function getUserInfo() {
  //   const jwt = localStorage.getItem("jwt");
  //   mainApi.getUserInformation(jwt)
  //     .then((data) => {
  //       setCurrentUser(data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

  /** Проверяет наличие и актуальность токена */
  function checkToken() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth.getContent(jwt)
        .then(() => {
          // getUserInfo();
          getData();
          setLoggedIn(true);
          setMessageFromApi('');
          history.push('/movies');
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  /** Запрашивает карточки и информацию о пользователе */
  function getData() {
    const jwt = localStorage.getItem("jwt");
    Promise.all(
      [
        mainApi.getUserInformation(jwt),
        mainApi.getMovies(jwt)
      ])
      .then((res) => {
        if (res[0].ok && res[1].ok) { // Если ответ пришёл без ошибки
          res[0].json()
            .then((data) => { setCurrentUser(data.data); })
            .catch((err) => { console.error(err); });
          res[1].json()
            // .then((data) => { setSavedMovies(findMoviesCreatedByCurrentUser(data.data)); })
            .then((data) => { setSavedMovies(data.data); })
            .catch((err) => { console.error(err); });
        }
        else { // Если ответ пришёл с ошибкой
          res[0].json()
            .then((data) => {
              returnMessageFromApi(data)
                .catch((err) => {
                  console.error(err);
                });
            })
            .catch((err) => { console.error(err); });
          res[1].json()
            .then((data) => {
              returnMessageFromApi(data)
                .catch((err) => {
                  console.error(err);
                });
            })
            .catch((err) => { console.error(err); });
        }
      })
      .catch((err) => { console.error(err); })
  }

  /** При обновлении currentUser обновляет массив savedMovies
   * (оставляет только карточки созданные текущим пользователем) */
  // React.useEffect(() => {
  //   setSavedMovies(findMoviesCreatedByCurrentUser(savedMovies));
  // }, [currentUser]);

  /** Проверяет наличие и актуальность токена при загрузке приложения */
  React.useEffect(() => {
    checkToken();
  }, []);

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

  /** Обработчик авторизации пользователя */
  function handleUserAuthorization(email, password) {
    setIsLoading(true);
    auth.authorization(email, password)
      .then((res) => {
        if (res.ok) { // Если ответ пришёл без ошибки
          res.json()
            .then((data) => {
              setLoggedIn(true);
              localStorage.setItem("jwt", data.jwt);
              // getUserInfo();
              getData();
              history.push('/movies');
            })
            .catch((err) => { console.error(err); });
        }
        else { // Если ответ пришёл с ошибкой
          res.json()
            .then((data) => {
              returnMessageFromApi(data)
                .catch((err) => {
                  console.error(err);
                  setMessageFromApi(err);
                });
            })
            .catch((err) => { console.error(err); });
        }
      })
      .catch((err) => { console.error(err); })
      .finally(() => { setIsLoading(false); });
  }

  /** Обработчик регистрации пользователя */
  function handleUserRegister(name, email, password) {
    setIsLoading(true);
    auth.register(name, email, password)
      .then((res) => {
        if (res.ok) { // Если ответ пришёл без ошибки
          res.json()
            .then((data) => { handleUserAuthorization(email, password); })
            .catch((err) => { console.error(err); });
        }
        else { // Если ответ пришёл с ошибкой
          res.json()
            .then((data) => {
              returnMessageFromApi(data)
                .catch((err) => {
                  console.error(err);
                  setMessageFromApi(err);
                });
            })
            .catch((err) => { console.error(err); });
        }
      })
      .catch((err) => { console.error(err); })
      .finally(() => { setIsLoading(false); });
  }

  /** Обновляет информацию о пользователе */
  function handleUpdateUser({ name, email }) {
    const jwt = localStorage.getItem("jwt");
    setIsLoading(true);
    mainApi.updateUserInformation(name, email, jwt)
    .then((res) => {
      if (res.ok) { // Если ответ пришёл без ошибки
        res.json()
          .then((data) => {
            setCurrentUser(data);
            setMessageFromApi('Информация успешно обновлена');
          })
          .catch((err) => { console.error(err); });
      }
      else { // Если ответ пришёл с ошибкой
        res.json()
          .then((data) => {
            returnMessageFromApi(data)
              .catch((err) => {
                console.error(err);
                setMessageFromApi(err);
              });
          })
          .catch((err) => { console.error(err); });
      }
    })
    .catch((err) => { console.error(err); })
    .finally(() => { setIsLoading(false); });
  }

  /** Выходит из аккаунта. Удаляет токен */
  function handleSignOutClick() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("filteredMovies");
    localStorage.removeItem("allMovies");
    setFilteredMovies([]);
    setLoggedIn(false);
    history.push('/');
  }

  /** Запрашивает фильмы с Api BeatFilm */
  function getMoviesFromBeatfilmApi(keyWord, checkboxOnlyShortMovies) {
    if (localStorage.getItem('allMovies')) { // Если ранее выполнялся запрос к АPI
      filterMovies(
        JSON.parse(localStorage.getItem('allMovies')),
        keyWord,
        checkboxOnlyShortMovies
      )
    } else {
      setIsLoading(true);
      moviesApi.getBeatfilmMovies()
        .then((data) => {
          localStorage.setItem("allMovies", JSON.stringify(data));
          filterMovies(data, keyWord, checkboxOnlyShortMovies)
        })
        .catch((err) => {
          setMessageFromApi('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
          console.error(err);
        })
        .finally(() => { setIsLoading(false); });
    }
  }

  function findMoviesCreatedByCurrentUser(movies) {
    console.log(movies);
    const moviesOfCurrentUser = movies.filter(movie => movie.owner === currentUser._id);
    return moviesOfCurrentUser;
  }

  /** Запрос сохранённых фильмов */
  function getSavedMoviesFromMainApi() {
    const jwt = localStorage.getItem("jwt");
    mainApi.getMovies(jwt)
      .then((res) => {
        if (res.ok) { // Если ответ пришёл без ошибки
          res.json()
            .then((data) => {
              setSavedMovies(findMoviesCreatedByCurrentUser(data.data));
            })
            .catch((err) => { console.error(err); });
        }
        else { // Если ответ пришёл с ошибкой
          res.json()
            .then((data) => {
              returnMessageFromApi(data)
                .catch((err) => {
                  console.error(err);
                });
            })
            .catch((err) => { console.error(err); });
        }
      })
      .catch((err) => { console.error(err); })
  }

  /** Подготавливает объект для отправки запроса */
  function prepareMovieObject({...movie}) {
    const image = baseUrlMoviesExplorerApi.slice(0, -1) + movie.image.url;
    const country = movie.country ? movie.country : 'Нет информации';
    const movieId = movie.id;
    const thumbnail = image;
    delete movie.id;
    delete movie.created_at;
    delete movie.updated_at;
    return {...movie, image, thumbnail, country, movieId};
  }
  
  /** Отправляет запрос на сохранение карточки с фильмом */
  function handleMovieSave(movie) {
    const jwt = localStorage.getItem("jwt");
    mainApi.saveMovie(prepareMovieObject(movie), jwt)
      .then((res) => {
        if (res.ok) { // Если ответ пришёл без ошибки
          res.json()
            .then((newMovie) => {
              setSavedMovies([...savedMovies, newMovie.data])
            })
            .catch((err) => { console.error(err); });
        }
        else { // Если ответ пришёл с ошибкой
          res.json()
            .then((data) => {
              returnMessageFromApi(data)
                .catch((err) => { console.error(err); });
            })
            .catch((err) => { console.error(err); });
        }
      })
      .catch((err) => { console.error(err); });
  }

  /** Фильтрует массив с фильмами по ключевому слову и чекбоксу */
  function filterMovies(allMovies, keyWord, checkboxOnlyShortMovies) {
    let arrayMovies = [];

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

    if (arrayMovies.length !== 0) { setIsMoviesWereFound(true); }
    else { setIsMoviesWereFound(false); }
    localStorage.setItem("filteredMovies", JSON.stringify(arrayMovies));
    setFilteredMovies(arrayMovies);
  }

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path="/">
            <Header
              loggedIn={loggedIn}
              headerThemeBlue={headerThemeBlue}
            />
            <Main onLandingPage={onLandingPage} />
            <Footer />
          </Route>

          <Route path="/movies">
            <Header
              loggedIn={loggedIn}
              headerThemeBlue={headerThemeBlue}
            />
            <ProtectedRoute
              path="/movies"
              loggedIn={loggedIn}
              moviesCardListIsFull={true}
              component={Movies}
              isLoading={isLoading}
              getMoviesFromBeatfilmApi={getMoviesFromBeatfilmApi}
              filteredMovies={filteredMovies}
              messageFromApi={messageFromApi}
              onMoviesPage={onMoviesPage}
              resetMoviesWereFound={resetMoviesWereFound}
              isMoviesWereFound={isMoviesWereFound}
              savedMovies={savedMovies}
              handleMovieSave={handleMovieSave}
            />
            <Footer />
          </Route>

          <Route path="/saved-movies">
            <Header
              loggedIn={loggedIn}
              headerThemeBlue={headerThemeBlue}
            />
            <ProtectedRoute
              path="/saved-movies"
              loggedIn={loggedIn}
              moviesCardListIsFull={true}
              component={SavedMovies}
            />
            <Footer />
          </Route> 

          <Route path="/profile">
            <Header
              loggedIn={loggedIn}
              headerThemeBlue={headerThemeBlue}
            />
            <ProtectedRoute
              path="/profile"
              loggedIn={loggedIn}
              component={Profile}
              handleUpdateUser={handleUpdateUser}
              handleSignOutClick={handleSignOutClick}
              // getUserInfo={getUserInfo}
              messageFromApi={messageFromApi}
              isLoading={isLoading}
              resetMessageFromApi={resetMessageFromApi}
            />
          </Route>

          <Route path="/signin">
            <Login
              handleUserAuthorization={handleUserAuthorization}
              messageFromApi={messageFromApi}
              onFormPage={onFormPage}
              isLoading={isLoading}
            />
          </Route>

          <Route path="/signup">
            <Register
              handleUserRegister={handleUserRegister}
              messageFromApi={messageFromApi}
              onFormPage={onFormPage}
              isLoading={isLoading}
            />
          </Route>

          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
