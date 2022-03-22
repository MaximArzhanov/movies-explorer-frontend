import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {

  const [isOnSavedMoviePage, setIsOnSavedMoviePage] = React.useState(false);

  /** Если ранее выполнялся поиск фильмов, то при открытии страницы будут отражены
   *  результаты последнего поиска
   */
  React.useEffect(() => {
    const recentFoundSavedMovies = JSON.parse(localStorage.getItem("recentFoundSavedMovies"));
    if (recentFoundSavedMovies) {
      if (recentFoundSavedMovies.length !== 0) { props.onSavedMoviesPage(recentFoundSavedMovies); }
    }
    else { props.onSavedMoviesPage([]); }

    setIsOnSavedMoviePage(true);

    return () => {
      props.resetMoviesWereFound(); // Сброс текста ошибки "Ничего не найдено"
      props.resetMessageFromApi(); // Сброс текста ошибки от Api
      setIsOnSavedMoviePage(false);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("recentFoundSavedMovies", JSON.stringify(props.foundSavedMovies));
  }, [props.foundSavedMovies]);

  return (
    <section className="saved-movies">
      <SearchForm
        handleSubmitSearch={props.handleSubmitSearchOnSavedMoviePage}
      />
      <MoviesCardList
        foundMovies={props.foundSavedMovies}
        handleMovieDelete={props.handleMovieDelete}
        savedMovies={props.savedMovies}
        isOnSavedMoviePage={isOnSavedMoviePage}
      />
      <p className="movies__message">{props.isMoviesWereFound || 'Ничего не найдено'}</p>
    </section>
  );
}

export default SavedMovies;