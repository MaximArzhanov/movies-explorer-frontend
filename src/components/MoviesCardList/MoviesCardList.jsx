import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'

function MoviesCardList(props) {

  return (
    
    props.isLoading
    ? <>
        <Preloader />
      </>
    : <ul className="movies-card-list">
        <MoviesCard buttonContent={props.buttonContent}/>
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
  );
}

export default MoviesCardList;