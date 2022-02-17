import React from 'react'
import './Profile.css'
import '../styles.css'

function Profile(props) {

    return (
        <div className="profile">
            <h2 className="profile__title">{props.title}</h2>
            <form className="form">
                <input className="form__input" type="text" />
                <input className="form__input" type="email" />
                <button className="form__button" type="submit" >
                    Редактировать
                </button>
            </form>
            <button className="button" type="button">
                Выйти из аккаунта
            </button>
        </div>
    )
};

export default Profile