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

  /** Массив всех загруженных фильмов (c api beatfilm-movies) */
  const [filteredMovies, setFilteredMovies] = React.useState([]);

  const [isMoviesWereFound, setIsMoviesWereFound] = React.useState(true);

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
  function getUserInfo() {
    const jwt = localStorage.getItem("jwt");
    mainApi.getUserInformation(jwt)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /** Проверяет наличие и актуальность токена */
  function checkToken() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth.getContent(jwt)
        .then(() => {
          getUserInfo();
          setLoggedIn(true);
          setMessageFromApi('');
          history.push('/movies');
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

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
              getUserInfo();
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
    setLoggedIn(false);
    history.push('/');
  }

  function getMoviesFromBeatfilmApi(keyWord) {
    setIsLoading(true);
    moviesApi.getBeatfilmMovies()
      .then((data) => {
        filterMovies(data, keyWord)
      })
      .catch((err) => {
        setMessageFromApi('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        console.log(err);
      })
      .finally(() => { setIsLoading(false); });
  }

  function filterMovies(allMovies, keyWord) {
    const arrayMovies = allMovies.filter((movie) => {
      return (movie.nameRU.toUpperCase().includes(keyWord.toUpperCase()));
    })
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
              isMoviesWereFound={isMoviesWereFound}
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
              getUserInfo={getUserInfo}
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
