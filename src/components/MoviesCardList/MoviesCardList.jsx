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
        {/* <MoviesCard buttonContent={props.buttonContent}/> */}
        {props.movies.map(({ ...movie }) => (
            <MoviesCard
              key={movie.id}
              movie={{ ...movie }}
            ></MoviesCard>
          ))}
      </ul>
  );
}

export default MoviesCardList;