import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard'
import ButtonLoadMore from '../ButtonLoadMore/ButtonLoadMore'

function MoviesCardList(props) {

  const [moviesCardListIsFull, setMoviesCardListIsFull] = React.useState(false);

  return (
    <>
      <ul className="movies-card-list">
        {/* <MoviesCard buttonContent={props.buttonContent}/> */}
        {props.filteredMovies.map(({ ...movie }) => (
            <MoviesCard
              key={movie.id}
              movie={{ ...movie }}
            ></MoviesCard>
          ))}
      </ul>
      { moviesCardListIsFull && <ButtonLoadMore /> }
    </>
  );
}

export default MoviesCardList;