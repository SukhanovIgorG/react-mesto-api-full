import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarInput = React.useRef();

  React.useEffect(()=>{
    avatarInput.current.value = '';
  },[isOpen, onClose])

  function hendleClickCloseButton() {
    onClose();
  }

  function hendleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarInput.current.value);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={hendleClickCloseButton}
      onSubmit={hendleSubmit}
      name="edit-avatar"
      title="Обновить аватар"
      textButton={"Сохранить"}
    >
        <input
          ref={avatarInput}
          className="form__input form__input_type_avatar"
          id="avatar-input"
          type="url"
          name="avatar"
          placeholder="Введите ссылку"
          minLength={2}
          maxLength={100}
          required
          autoFocus
        />
        <span className="form__input-error avatar-input-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
