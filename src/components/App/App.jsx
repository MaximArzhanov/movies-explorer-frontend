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

function App() {

  /** Стейт для установки темы для Header */
  const [headerThemeBlue, setHeaderThemeBlue] = React.useState(false);

  /** Если пользователь на главной странице (Main) то включается синяя тема для Header */
  function onLandingPage(state) {
    setHeaderThemeBlue(state);
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
          <Login />
        </Route>

        <Route path="/signup">
          <Register />
        </Route>

        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
