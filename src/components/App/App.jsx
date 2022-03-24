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
import auth from '../../utils/Auth';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { errorMessageFromBeatFilmApi } from '../../utils/constants'
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {
  searchMovies,
  prepareMovieObject,
  findMoviesCreatedByCurrentUser,
  performErrorResponse
} from '../../utils/utils';

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
  const [foundMovies, setFoundMovies] = React.useState([]);

  /** Массив найденных, при запросе, фильмов (c api beatfilm-movies) */
  const [foundSavedMovies, setFoundSavedMovies] = React.useState([]);

  /** Массив сохранённых фильмов */
  const [savedMovies, setSavedMovies] = React.useState([]);

  const [isMoviesWereFound, setIsMoviesWereFound] = React.useState(true);

  function resetMoviesWereFound() {
    setIsMoviesWereFound(true);
  }

  /** Если ранее выполнялся поиск фильмов на странице Movies,
   *  то при открытии страницы будут отражены
   *  результаты последнего поиска
   */
  function onMoviesPage(movies) {
    setFoundMovies(movies);
  }

  /** Если ранее выполнялся поиск фильмов на странице SavedMovies,
   *  то при открытии страницы будут отражены
   *  результаты последнего поиска
   */
  function onSavedMoviesPage([...movies]) {
    setFoundSavedMovies(movies)
  }

  function resetMessageFromApi() {
    setMessageFromApi('');
  }

   /** Текущий пользователь */
   const [isLoading, setIsLoading] = React.useState(false);

  /** Если пользователь на главной странице (Main) то включается синяя тема для Header */
  function onLandingPage(state) {
    setHeaderThemeBlue(state);
  }

  function handleMessageFromApi(err) {
    setMessageFromApi(err);
  }

  /** Проверяет наличие и актуальность токена */
  function checkToken() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth.getContent(jwt)
        .then(() => {
          getData();
          setLoggedIn(true);
          setMessageFromApi('');
          history.push('/movies');
        })
        .catch((err) => { console.error(err); });
    }
  }

  /** Проверяет наличие и актуальность токена при загрузке приложения */
  React.useEffect(() => {
    checkToken();
  }, []);

  /** Запрашивает карточки и информацию о пользователе */
  function getData() {
    const jwt = localStorage.getItem("jwt");
    Promise.all([ mainApi.getUserInformation(jwt), mainApi.getMovies(jwt) ])
      .then((res) => {
        if (res[0].ok && res[1].ok) { // Если ответ пришёл без ошибки
          res[0].json()
            .then((user) => {
              setCurrentUser(user.data);
              res[1].json()
                .then((movies) => {
                  setSavedMovies(findMoviesCreatedByCurrentUser(movies.data, user.data._id));
                })
                .catch((err) => { console.error(err); });
            })
            .catch((err) => { console.error(err); });
        }
        else { // Если ответ пришёл с ошибкой
          performErrorResponse(res[0], handleMessageFromApi);
          performErrorResponse(res[1], handleMessageFromApi);
        }
      })
      .catch((err) => { console.error(err); })
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
              getData();
              history.push('/movies');
            })
            .catch((err) => { console.error(err); });
        }
        else { performErrorResponse(res, handleMessageFromApi); } // Если ответ пришёл с ошибкой
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
        else { performErrorResponse(res, handleMessageFromApi); } // Если ответ пришёл с ошибкой
      })
      .catch((err) => { console.error(err); })
      .finally(() => { setIsLoading(false); });
  }

  /** Обновляет информацию о пользователе */
  function handleUpdateUser({ name, email }) {
    setIsLoading(true);
    const jwt = localStorage.getItem("jwt");
    mainApi.updateUserInformation(name, email, jwt)
    .then((res) => {
      if (res.ok) { // Если ответ пришёл без ошибки
        res.json()
          .then((data) => {
            setCurrentUser(data.data);
            setMessageFromApi('Информация успешно обновлена');
          })
          .catch((err) => { console.error(err); });
      }
      else { performErrorResponse(res, handleMessageFromApi); } // Если ответ пришёл с ошибкой
    })
    .catch((err) => { console.error(err); })
    .finally(() => { setIsLoading(false); });
  }

  /** Выходит из аккаунта. Удаляет токен */
  function handleSignOutClick() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("recentFoundMovies");
    localStorage.removeItem("recentFoundSavedMovies");
    localStorage.removeItem("allMovies");
    setFoundMovies([]);
    setLoggedIn(false);
    history.push('/');
  }

  function determineIfMoviesAreFound(foundMoviesArray) {
    if (foundMoviesArray.length !== 0) { setIsMoviesWereFound(true); }
    else { setIsMoviesWereFound(false); }
  }

  function handleFoundMoviesArray(foundMoviesArray) {
    determineIfMoviesAreFound(foundMoviesArray);
    localStorage.setItem("recentFoundMovies", JSON.stringify(foundMoviesArray));
    setFoundMovies(foundMoviesArray);
  }

  /** Запрашивает фильмы с Api BeatFilm (Поиск на странице Movies) */
  function handleSubmitSearchOnMoviePage(keyWord, checkboxOnlyShortMovies) {
    if (localStorage.getItem('allMovies')) { // Если ранее выполнялся запрос к АPI
      const allMovies = JSON.parse(localStorage.getItem('allMovies'));
      const foundMoviesArray = searchMovies(allMovies, keyWord, checkboxOnlyShortMovies);
      handleFoundMoviesArray(foundMoviesArray);
    } else { // Если запрос к API не выполнялся (В локальном хранилище нет всех фильмов)
      setIsLoading(true);
      moviesApi.getBeatfilmMovies()
        .then((data) => {
          localStorage.setItem("allMovies", JSON.stringify(data));
          const foundMoviesArray = searchMovies(data, keyWord, checkboxOnlyShortMovies);
          handleFoundMoviesArray(foundMoviesArray);
        })
        .catch((err) => {
          setMessageFromApi(errorMessageFromBeatFilmApi);
          console.error(err);
        })
        .finally(() => { setIsLoading(false); });
    }
  }

  /** Поиск на странице SavedMovies */
  function handleSubmitSearchOnSavedMoviePage(keyWord, checkboxOnlyShortMovies) {
    const foundSavedMoviesArray = searchMovies(savedMovies, keyWord, checkboxOnlyShortMovies);
    determineIfMoviesAreFound(foundSavedMoviesArray);
    localStorage.setItem("recentFoundSavedMovies", JSON.stringify(foundSavedMoviesArray));
    setFoundSavedMovies(foundSavedMoviesArray);
  }
  
  /** Отправляет запрос на сохранение карточки с фильмом */
  function handleMovieSave(movie) {
    const jwt = localStorage.getItem("jwt");
    mainApi.saveMovie(prepareMovieObject(movie), jwt)
      .then((res) => {
        if (res.ok) { // Если ответ пришёл без ошибки
          res.json()
            .then((newMovie) => { setSavedMovies([...savedMovies, newMovie.data]); })
            .catch((err) => { console.error(err); });
        }
        else { performErrorResponse(res, handleMessageFromApi); } // Если ответ пришёл с ошибкой
      })
      .catch((err) => { console.error(err); });
  }

  /** Удаляет карточку  */
  function handleMovieDelete(movieId) {
    const jwt = localStorage.getItem("jwt");
    mainApi.deleteCard(movieId, jwt)
      .then((res) => {
        if (res.ok) { // Если ответ пришёл без ошибки
          res.json()
            .then((deletedMovie) => {
              setSavedMovies((state) => //Возвращает все карточки кроме той которую удалили
                state.filter(savedMovie => savedMovie._id !== movieId)
              );
              setFoundSavedMovies((state) => //Возвращает все карточки кроме той которую удалили
                state.filter(foundSavedMovie => foundSavedMovie._id !== movieId)
              );
              updateRecentFoundSavedMovies(movieId);
            })
            .catch((err) => { console.error(err); });
        }
        else { performErrorResponse(res, handleMessageFromApi); } // Если ответ пришёл с ошибкой
      })
      .catch((err) => { console.error(err); });
  }

  /** Обновляет список фильмов в локальном хранилище */
  function updateRecentFoundSavedMovies(movieId) {
    const recentFoundSavedMovies =  JSON.parse(localStorage.getItem("recentFoundSavedMovies"));
    const newFoundSavedMovies = recentFoundSavedMovies.filter((foundSavedMovie) => {
      return foundSavedMovie._id !== movieId;
    });
    localStorage.setItem("recentFoundSavedMovies", JSON.stringify(newFoundSavedMovies));
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
              handleSubmitSearchOnMoviePage={handleSubmitSearchOnMoviePage}
              foundMovies={foundMovies}
              messageFromApi={messageFromApi}
              resetMessageFromApi={resetMessageFromApi}
              onMoviesPage={onMoviesPage}
              resetMoviesWereFound={resetMoviesWereFound}
              isMoviesWereFound={isMoviesWereFound}
              savedMovies={savedMovies}
              handleMovieSave={handleMovieSave}
              handleMovieDelete={handleMovieDelete}
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
              component={SavedMovies}
              handleSubmitSearchOnSavedMoviePage={handleSubmitSearchOnSavedMoviePage}
              resetMoviesWereFound={resetMoviesWereFound}
              resetMessageFromApi={resetMessageFromApi}
              onSavedMoviesPage={onSavedMoviesPage}
              isMoviesWereFound={isMoviesWereFound}
              foundSavedMovies={foundSavedMovies}
              savedMovies={savedMovies}
              handleMovieDelete={handleMovieDelete}
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
              messageFromApi={messageFromApi}
              isLoading={isLoading}
              resetMessageFromApi={resetMessageFromApi}
            />
          </Route>

          <Route path="/signin">
            <Login
              handleUserAuthorization={handleUserAuthorization}
              messageFromApi={messageFromApi}
              resetMessageFromApi={resetMessageFromApi}
              isLoading={isLoading}
            />
          </Route>

          <Route path="/signup">
            <Register
              handleUserRegister={handleUserRegister}
              messageFromApi={messageFromApi}
              resetMessageFromApi={resetMessageFromApi}
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
