import React from 'react';
import { Route, Switch } from 'react-router-dom';
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

function App() {

  /** Стейт для установки темы для Header */
  const [headerThemeBlue, setHeaderThemeBlue] = React.useState(false);

  /** Если пользователь на главной странице (Main) то включается синяя тема для Header */
  function onLandingPage(state) {
    setHeaderThemeBlue(state);
  }

  /** Обработчик регистрации пользователя */
  function handleUserRegister(name, email, password) {
    auth.register(name, email, password)
      .then((data) => {
        console.log(data.message);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  /** Обработчик авторизации пользователя */
  function handleUserAuthorization(email, password) {
    auth.authorization(email, password)
      .then((data) => {
        console.log(data);
        console.log(data.message);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Header loggedIn={false} headerThemeBlue={headerThemeBlue} />
          <Main onLandingPage={onLandingPage} />
          <Footer />
        </Route>

        <Route path="/movies">
          <Header loggedIn={true} headerThemeBlue={headerThemeBlue} />
          <Movies moviesCardListIsFull={true} />
          <Footer />
        </Route>

        <Route path="/saved-movies">
          <Header loggedIn={true} headerThemeBlue={headerThemeBlue} />
          <SavedMovies moviesCardListIsFull={true} />
          <Footer />
        </Route>

        <Route path="/profile">
          <Header loggedIn={true} headerThemeBlue={headerThemeBlue} />
          <Profile />
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
    </div>
  );
}

export default App;
