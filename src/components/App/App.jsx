import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function App() {
  return (
    <div className="app">
      <Header />
        <MoviesCardList />
      <Footer />
    </div>
  );
}

export default App;
