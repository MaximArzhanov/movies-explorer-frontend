import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies'
import Login from '../Login/Login';
import Register from '../Register/Register';
import AuthPage from '../AuthPage/AuthPage'
import Profile from '../Profile/Profile'
import Footer from '../Footer/Footer';
import ErrorPage from '../ErrorPage/ErrorPage';

function App() {

  /** Стейт для установки темы для Header */
  const [headerThemeBlue, setHeaderThemeBlue] = React.useState(false);

  /** Если пользователь на главной странице (Main) то включается синяя тема для Header */
  function onLandingPage(state) {
    setHeaderThemeBlue(state);
  }

  return (
    <div className="app">
      <Header loggedIn={true} headerThemeBlue={headerThemeBlue} />
      {/* <Main onLandingPage={onLandingPage} /> */}
      {/* <Movies moviesCardListIsFull={true} /> */}
      <SavedMovies moviesCardListIsFull={true} />
      
      {/* <ErrorPage /> */}
      {/* <Register /> */}
      {/* <Login /> */}
      {/* <Profile /> */}
      <Footer />
    </div>
  );
}

export default App;
