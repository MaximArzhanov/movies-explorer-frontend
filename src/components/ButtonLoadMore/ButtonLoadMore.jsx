import React from 'react';
import './ButtonLoadMore.css';

function ButtonLoadMore(props) {

  return (

    <div className="button-load-more">
      <button className="button-load-more__button" onClick={props.handleClickButtonLoadMore}>
          Ещё
      </button>
    </div>

  );
}

export default ButtonLoadMore;