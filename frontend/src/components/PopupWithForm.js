function PopupWithForm({
  isOpen,
  onClose,
  name,
  title,
  textButton,
  onSubmit,
  children,
}) {
  function handleClickCloseButton() {
    onClose();
  }

  function handleSubmit(e) {
    onSubmit(e);
  }

  return (
    <div
      className={`popup popup_type_${name} ${isOpen && "popup_visible"}`}
      id={`popup_type_${name}`}
    >
      <div className="popup__container popup__container_type_dialog">
        <h2 className="popup__header">{title}</h2>
        <form
          onSubmit={handleSubmit}
          className={`form form_type_${name}`}
          // id={`form_type_${name}`}
          name={`form_type_${name}`}
          method="POST"
        >
          {children}
          <button className="form__button form-profile-button" type="submit">
            {textButton}
          </button>
        </form>
        <button
          onClick={handleClickCloseButton}
          className="popup__close-button"
          type="button"
        />
      </div>
    </div>
  );
}

export default PopupWithForm;
