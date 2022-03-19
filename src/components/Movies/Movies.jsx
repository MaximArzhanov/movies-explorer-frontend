import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader'

function Movies(props) {

  /** Если ранее выполнялся поиск фильма, то при открытии страницы будут отражены
   *  результаты последнего поиска
   */
  React.useEffect(() => {
    const filteredMovies = JSON.parse(localStorage.getItem("filteredMovies"));
    if (filteredMovies) {
      if (filteredMovies.length !== 0) {
        props.onMoviesPage(filteredMovies);
      }
    } else {
      props.onMoviesPage([]);
    }

    return () => {
      props.resetMoviesWereFound();
    }
  }, []);

  return (
    <section className="movies">
      <SearchForm
        getMoviesFromBeatfilmApi={props.getMoviesFromBeatfilmApi}
        messageFromApi={props.messageFromApi}
      />
      {
        props.isLoading
          ? <Preloader />
          : <>
              <MoviesCardList filteredMovies={props.filteredMovies}/>
              <p className="movies__message">{props.isMoviesWereFound || 'Ничего не найдено'}</p>
            </>
      }
      
    </section>
  );
}

export default Movies;