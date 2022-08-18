import React from "react";

function ImagePopup(props) {
  function hendleClickCloseButton() {
    props.onClose();
  }

  return (
    <div
      className={`popup popup_type_photo ${props.card.link && "popup_visible"}`}
      id="popup_type_photo"
    >
      <div className="popup__conteiner_type_photo">
        <button
          onClick={hendleClickCloseButton}
          className="popup-photo__close-button popup__close-button_type_photo"
          type="button"
        />
        <img
          className="popup__img"
          id="popup__img"
          src={props.card ? props.card.link : ""}
          alt={props.card ? props.card.name : ""}
        />
        <p className="popup__photo-title">
          {props.card ? props.card.name : ""}
        </p>
      </div>
    </div>
  );
}

export default ImagePopup;
