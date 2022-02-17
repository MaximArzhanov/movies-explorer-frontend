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


function App() {
  return (
    <div className="app">
      <Register />
    </div>
  );
}

export default App;
