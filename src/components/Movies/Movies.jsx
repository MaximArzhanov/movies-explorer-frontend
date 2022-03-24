import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader'

// Индекс для отслеживания элемента в массиве найденных фильмов (foundMovies)
let startIndex = 0;

// Максимальное количество карточек для отображения на странице
// или максимальное количество каточек для добавления на страницу
let maxQuantityRequiredOfCards = 0;

// Показывает отрисовывался ли начальный массив карточек на страницу
let initialArrayOfCardsShowed = false;

// Вспомогательный массив
// (без него не удаётся сбросить state переменную moviesForPage, при обновлении props.foundMovies)
let bufferFoundMovies = [];

function Movies(props) {

  /** Если страница с карточками заполнена в соответствии с шириной экрана */
  const [isMoviesCardListFull, setIsMoviesCardListFull] = React.useState(false);

  const [isOnMoviesPage, setIsOnMoviesPage] = React.useState(false);

  /** Элементы массива bufferFoundMovies отрисовываются на страницу */
  const [moviesForPage, setMoviesForPage] = React.useState([]);

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

  /** Определить, что монтирован компонент Movie */
  React.useEffect(() => {
    setIsOnMoviesPage(true);
    return () => { setIsOnMoviesPage(false) }
  }, []);

  /** Определяет количество оставшихся карточек в массиве с фильмами */
  function countRemainingQuantityOfCards(arrayWithAllFoundMovies) {
    let counter = 0;
    arrayWithAllFoundMovies.forEach((element, index) => {
      if (index >= startIndex) { counter++; }
    });
    return counter;
  }

  /** Определяет был ли уже отрисован первоначальный массив найденных карточек */
  function updateInitialArrayOfCardsShowed(lengthOfArray) {
    if (lengthOfArray === 0) { initialArrayOfCardsShowed = false; }
    else { initialArrayOfCardsShowed = true; }
  }

  /** Определяет количество карточек для отображения в соответствии с шириной экрана */
  function determineMaxQuantityRequiredOfCards() {
    updateInitialArrayOfCardsShowed(bufferFoundMovies.length)
    const widthOfScreen = document.documentElement.clientWidth;
    if (widthOfScreen < 624) {
      if (initialArrayOfCardsShowed) { maxQuantityRequiredOfCards = 1; }
      else { maxQuantityRequiredOfCards = 5; }
    }
    if (widthOfScreen > 623 && widthOfScreen < 1134) {
      if (initialArrayOfCardsShowed) { maxQuantityRequiredOfCards = 2; }
      else { maxQuantityRequiredOfCards = 8; }
    }
    if (widthOfScreen > 1133) {
      if (initialArrayOfCardsShowed) { maxQuantityRequiredOfCards = 3;}
      else { maxQuantityRequiredOfCards = 12; }
    }
  }

  /** Обновляет массив bufferFoundMovies */
  function updateBufferFoundMovies() {
    // Вспомагательный массив для добавления набора карточек с фильмами
    const arrayForAddMovies = [];
    for (let index = 0; index < props.foundMovies.length; index++) {
      if (index >= startIndex && index < (startIndex + maxQuantityRequiredOfCards)) {
        arrayForAddMovies.push(props.foundMovies[index]);
      }
      if (index === (startIndex + maxQuantityRequiredOfCards)) {
        startIndex = index;
        break;
      }
    }
    bufferFoundMovies = [...bufferFoundMovies, ...arrayForAddMovies];
    setMoviesForPage([...bufferFoundMovies])
  }

  /** Сбрасывает счётчик startIndex */
  function resetStartIndex() {
    startIndex = 0;
  }

  /** Сбрасывает массив отображаемых карточек */
  function resetBufferFoundMovies() {
    bufferFoundMovies = [];
  }

  /** Обновляет массив с фильмами для отрисовки на страницу. Добавляет/Удаляет кнопку "Ещё" */
  function renderMoviesCard() {
    determineMaxQuantityRequiredOfCards();
    if (countRemainingQuantityOfCards([...props.foundMovies]) > maxQuantityRequiredOfCards) {
      updateBufferFoundMovies();
      setIsMoviesCardListFull(true);
    } else {
      updateBufferFoundMovies();
      setIsMoviesCardListFull(false);
    }
  }

  /** Событие при нажатии кнопку "Ещё" */
  function handleClickButtonLoadMore() {
    renderMoviesCard();
  }

  /** При монтировании компонента добавляется слушатель события изменения ширины окна браузера */
  React.useEffect(() => {
    const handleScreenResize = () => {
      determineMaxQuantityRequiredOfCards();
    }
    window.addEventListener('resize', handleScreenResize);
    return () => { window.removeEventListener('resize', handleScreenResize); }
  }, []);

  /** При обновлении массива найденных фильмов foundMovies (При поиске фильмов) */
  React.useEffect(() => {
    resetStartIndex();
    resetBufferFoundMovies();
    renderMoviesCard();
  }, [props.foundMovies]);

  return (
    <section className="movies">
      <SearchForm
        handleSubmitSearch={props.handleSubmitSearchOnMoviePage}
        messageFromApi={props.messageFromApi}
        isOnMoviesPage={isOnMoviesPage}
        resetBufferFoundMovies={resetBufferFoundMovies}
      />
      {
        props.isLoading
          ? <Preloader />
          : <>
              <MoviesCardList
                foundMovies={moviesForPage}
                handleMovieSave={props.handleMovieSave}
                handleMovieDelete={props.handleMovieDelete}
                savedMovies={props.savedMovies}
                isMoviesCardListFull={isMoviesCardListFull}
                sMoviesCardListFull={false}
                handleClickButtonLoadMore={handleClickButtonLoadMore}
              />
              <p className="movies__message">{props.isMoviesWereFound || 'Ничего не найдено'}</p>
            </>
      }
      
    </section>
  );
}

export default Movies;