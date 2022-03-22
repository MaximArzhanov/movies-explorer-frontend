import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard'
import ButtonLoadMore from '../ButtonLoadMore/ButtonLoadMore'
import { unstable_renderSubtreeIntoContainer } from 'react-dom/cjs/react-dom.development';

function MoviesCardList(props) {

  const [moviesCardListIsFull, setMoviesCardListIsFull] = React.useState(false);

  // function getId(movie) {
  //   if (props.isOnSavedMoviePage) {
  //     return movie._id;
  //   } else {
  //     return movie.id;
  //   }
  // }

  // React.useEffect(() => {
  //   return () => {

  //   }
  // });

  return (
    <>
      <ul className="movies-card-list">
        {/* <MoviesCard buttonContent={props.buttonContent}/> */}
        {props.foundMovies.map(({ ...foundMovie }, index) => (
            <MoviesCard
              // key={props.isOnMoviePage ? foundMovie._id : foundMovie.id}
              key={index}
              foundMovie={{ ...foundMovie }}
              handleMovieSave={props.handleMovieSave}
              handleMovieDelete={props.handleMovieDelete}
              isOnSavedMoviePage={props.isOnSavedMoviePage}
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