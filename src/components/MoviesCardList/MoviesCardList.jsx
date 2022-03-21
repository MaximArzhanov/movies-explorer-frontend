import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard'
import ButtonLoadMore from '../ButtonLoadMore/ButtonLoadMore'

function MoviesCardList(props) {

  const [moviesCardListIsFull, setMoviesCardListIsFull] = React.useState(false);

  function test(movie) {
    
    // return props.savedMovies.some((item) => {
    //   return (item.movieId === movie.id && item.owner === currentUser.data._id);
    // });
  }

  return (
    <>
      <ul className="movies-card-list">
        {/* <MoviesCard buttonContent={props.buttonContent}/> */}
        {props.filteredMovies.map(({ ...movie }) => (
            <MoviesCard
              key={movie.id}
              movie={{ ...movie }}
              handleMovieSave={props.handleMovieSave}
              // savedMovie={props.savedMovie}
              savedMovies={props.savedMovies}
              // isMovieSaved={test({ ...movie })}
            ></MoviesCard>
          ))}
      </ul>
      { moviesCardListIsFull && <ButtonLoadMore /> }
    </>
  );
}

export default MoviesCardList;