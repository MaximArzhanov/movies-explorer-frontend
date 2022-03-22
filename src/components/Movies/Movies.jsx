import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader'

function Movies(props) {

  /** Если ранее выполнялся поиск фильмов, то при открытии страницы будут отражены
   *  результаты последнего поиска
   */
  React.useEffect(() => {
    const recentFoundMovies = JSON.parse(localStorage.getItem("recentFoundMovies"));
    if (recentFoundMovies) {
      if (recentFoundMovies.length !== 0) { props.onMoviesPage(recentFoundMovies); }
    } else { props.onMoviesPage([]); }

    return () => { 
      props.resetMoviesWereFound(); // Сброс текста ошибки "Ничего не найдено"
      props.resetMessageFromApi(); // Сброс текста ошибки от Api
    }
  }, []);

  return (
    <section className="movies">
      <SearchForm
        handleSubmitSearch={props.handleSubmitSearchOnMoviePage}
        messageFromApi={props.messageFromApi}
      />
      {
        props.isLoading
          ? <Preloader />
          : <>
              <MoviesCardList
                foundMovies={props.foundMovies}
                handleMovieSave={props.handleMovieSave}
                handleMovieDelete={props.handleMovieDelete}
                savedMovies={props.savedMovies}
              />
              <p className="movies__message">{props.isMoviesWereFound || 'Ничего не найдено'}</p>
            </>
      }
      
    </section>
  );
}

export default Movies;