import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

const Card = ({ card, onClick, onCardLike, onCardDelete }) => {

  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    onClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  const isOwn = card.owner === currentUser._id;
  const isLiked = Array.isArray(card.likes) ? card.likes.includes(currentUser._id) : false;
  // const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__like ${
    !isLiked ? "" : "card__like_active"
  }`;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `card__trash ${
    isOwn ? "card__trash_visible" : "card__trash_hidden"
  }`;

  return (
    <li className="card" key={card._id} id={card._id}>
      <img
        onClick={handleClick}
        className="card__image"
        src={card.link}
        alt={card.name}
      />

      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-box">
          <button
            onClick={handleCardLike}
            className={cardLikeButtonClassName}
            type="button"
          />
          <p className="card__like-counter">{Array.isArray(card.likes) ? card.likes.length : 0}</p>
        </div>
      </div>
      <button
        onClick={handleCardDelete}
        className={cardDeleteButtonClassName}
        type="button"
      />
    </li>
  );
};

export default Card;
