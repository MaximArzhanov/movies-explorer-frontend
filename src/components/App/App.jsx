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
import api from '../../utils/Api';
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

  /** Если пользователь на главной странице (Main) то включается синяя тема для Header */
  function onLandingPage(state) {
    setHeaderThemeBlue(state);
  }

  /** Проверяет наличие и актуальность токена */
  function tokenCheck() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth.checkToken(jwt)
        .then(() => {
          setLoggedIn(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  /** Проверяет наличие и актуальность токена при загрузке приложения */
  React.useEffect(() => {
    tokenCheck();
  }, []);

  /** Обработчик авторизации пользователя */
  function handleUserAuthorization(email, password) {
    auth.authorization(email, password)
      .then((data) => {
        console.log(data);
        setLoggedIn(true);
        localStorage.setItem("jwt", data.jwt);
        history.push('/movies');
      })
      .catch((err) => {
        console.error(err);
      })
  }

  /** Обработчик регистрации пользователя */
  function handleUserRegister(name, email, password) {
    auth.register(name, email, password)
      .then((data) => {
        console.log(data.message);
        handleUserAuthorization(email, password);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  /** Запрашивает информацию о пользователе */
  function getUserInfo() {
    const jwt = localStorage.getItem("jwt");
    api.getUserInformation(jwt)
      .then((data) => {
        console.log(data);
        setCurrentUser(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /** Обновляет информацию о пользователе */
  function handleUpdateUser({ name, email }) {
    const jwt = localStorage.getItem("jwt");
    api.updateUserInformation(name, email, jwt)
      .then((userInfo) => {
        console.log(userInfo.data);
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  /** Запрашивает информацию о пользователе при загрузке страницы */
  React.useEffect(() => {
    getUserInfo();
  }, []);

  /** Выходит из аккаунта. Удаляет токен */
  function handleSignOutClick() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push('/');
  }

  // console.log(loggedIn);

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
              loggedIn={loggedIn}
              moviesCardListIsFull={true}
              component={Movies}
            />
            <Footer />
          </Route>

          <Route path="/saved-movies">
            <Header
              loggedIn={loggedIn}
              headerThemeBlue={headerThemeBlue}
            />
            <ProtectedRoute
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
              loggedIn={loggedIn}
              component={Profile}
              handleUpdateUser={handleUpdateUser}
              handleSignOutClick={handleSignOutClick}
            />
          </Route>

          <Route path="/signin">
            <Login
              handleUserAuthorization={handleUserAuthorization}
            />
          </Route>

          <Route path="/signup">
            <Register
              handleUserRegister={handleUserRegister}
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
