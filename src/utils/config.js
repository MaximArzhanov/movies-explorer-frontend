const ERROR_MESSAGE_FROM_BEATFILM_API = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';

const MESSAGE_EDIT_PROFILE_SUCCESS = 'Информация успешно обновлена';
const MESSAGE_EMAIL_MUST_MATCH_FORMAT = 'email должен соответствовать формату: user@email.domain';
const MESSAGE_NOTHING_FOUND = 'Ничего не найдено';
const MESSAGE_NEED_ENTER_KEYWORD = 'Нужно ввести ключевое слово';
const MESSAGE_NO_INFORMATION_AVAILABLE = 'Нет информации';

const JWT = 'jwt';
const RECENT_FOUND_MOVIES = 'recentFoundMovies';
const ALL_MOVIES = 'allMovies';
const TEXT_OF_QUERY_ON_MOVIE_PAGE = 'textOfQueryOnMoviePage';
const CHECKBOX_STATE_ON_MOVIE_PAGE = 'checkboxStateOnMoviePage';

const MIN_LENGTH_INPUT = 2;
const MAX_LENGTH_INPUT = 30;

const SCREEN_SIZE_SMALL = 624;
const SCREEN_SIZE_MIDDLE = 1023;
const SCREEN_SIZE_LARGE = 1134;

const MAX_QUANTITY_REQUIRED_CARDS_1 = 1;
const MAX_QUANTITY_REQUIRED_CARDS_2 = 2;
const MAX_QUANTITY_REQUIRED_CARDS_3 = 3;
const MAX_QUANTITY_REQUIRED_CARDS_5 = 5;
const MAX_QUANTITY_REQUIRED_CARDS_8 = 8;
const MAX_QUANTITY_REQUIRED_CARDS_12 = 12;

const KEY_BUTTON_ESCAPE = 'Escape';

const BASE_URL_MOVIES_EXPLORER_API = 'https://ap.diploma.maxim.arzhanov.nomoredomains.work/';
const BASE_URL_BEATFILM_MOVIES_API = 'https://api.nomoreparties.co/beatfilm-movies';
const BASE_URL_IMAGE = 'https://api.nomoreparties.co/';

const DURATION_SHORT_MOVIE = 40;

export {
    ERROR_MESSAGE_FROM_BEATFILM_API,
    MESSAGE_EMAIL_MUST_MATCH_FORMAT,
    MESSAGE_NOTHING_FOUND,
    MESSAGE_EDIT_PROFILE_SUCCESS,
    MESSAGE_NO_INFORMATION_AVAILABLE,
    MESSAGE_NEED_ENTER_KEYWORD,
    MIN_LENGTH_INPUT,
    MAX_LENGTH_INPUT,
    JWT,
    RECENT_FOUND_MOVIES,
    ALL_MOVIES,
    TEXT_OF_QUERY_ON_MOVIE_PAGE,
    CHECKBOX_STATE_ON_MOVIE_PAGE,
    SCREEN_SIZE_SMALL,
    SCREEN_SIZE_MIDDLE,
    SCREEN_SIZE_LARGE,
    MAX_QUANTITY_REQUIRED_CARDS_1,
    MAX_QUANTITY_REQUIRED_CARDS_2,
    MAX_QUANTITY_REQUIRED_CARDS_3,
    MAX_QUANTITY_REQUIRED_CARDS_5,
    MAX_QUANTITY_REQUIRED_CARDS_8,
    MAX_QUANTITY_REQUIRED_CARDS_12,
    KEY_BUTTON_ESCAPE,
    BASE_URL_MOVIES_EXPLORER_API,
    BASE_URL_BEATFILM_MOVIES_API,
    BASE_URL_IMAGE,
    DURATION_SHORT_MOVIE
}
