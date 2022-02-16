import React from 'react'
import './Preloader.css'

const Preloader = () => {
    return (
        <div className="preloader">
            <button className="preloader__button">Ещё</button>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader