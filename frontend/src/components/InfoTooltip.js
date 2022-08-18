function InfoTooltip ({onClose, message, status} ) {

  const messageStatus = message;
  const dialogMessageStatus = status;

  function hendleClickCloseButton() {
    onClose();
  }

  return (
    // <div className="dialog-message-popup dialog-message-popup_visible">
    <div className={`dialog-message-popup ${messageStatus ? 'dialog-message-popup_visible' : ''}`}>
      <div className="dialog-message-popup__container">
        <div className={`dialog-message-popup__image dialog-message-popup__image_type_${dialogMessageStatus ? 'ok' : 'not' }`} ></div>
        <span className="dialog-message-popup__span">{dialogMessageStatus ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.' }
</span>
        <button
          onClick={hendleClickCloseButton}
          className="popup__close-button dialog-message-popup__button"
          type="button"
        />
      </div>
      
    </div>
  )
}
export default InfoTooltip
