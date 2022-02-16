import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import MoviesCard from '../MoviesCard/MoviesCard';

function App() {
  return (
    <div className="app">
      <Header />
        <MoviesCard />
      <Footer />
    </div>
  );
}

export default App;
