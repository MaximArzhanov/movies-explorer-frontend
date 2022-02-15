import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import Footer from '../Footer/Footer';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';

function App() {
  return (
    <div className="app">
      <Header />
      <Promo />
      <AboutProject />
      <Techs />
      <Footer />
    </div>
  );
}

export default App;
