import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {

  const [isOnSavedMoviesPage, setIsOnSavedMoviesPage] = React.useState(false);

  /** Если ранее выполнялся поиск фильмов, то при открытии страницы будут отражены
   *  результаты последнего поиска
   */
  React.useEffect(() => {
    props.onSavedMoviesPage(props.savedMovies);

    setIsOnSavedMoviesPage(true);

    return () => {
      props.resetMoviesWereFound(); // Сброс текста ошибки "Ничего не найдено"
      props.resetMessageFromApi(); // Сброс текста ошибки от Api
      setIsOnSavedMoviesPage(false);
    }
  }, []);

  return (
    <section className="saved-movies">
      <SearchForm
        handleSubmitSearch={props.handleSubmitSearchOnSavedMoviePage}
        isOnSavedMoviesPage={isOnSavedMoviesPage}
        foundMovies={props.foundSavedMovies}
      />
      <MoviesCardList
        foundMovies={props.foundSavedMovies}
        handleMovieDelete={props.handleMovieDelete}
        savedMovies={props.savedMovies}
        isOnSavedMoviesPage={isOnSavedMoviesPage}
      />
      <p className="movies__message">{props.isMoviesWereFound || 'Ничего не найдено'}</p>
    </section>
  );
}

export default SavedMovies;