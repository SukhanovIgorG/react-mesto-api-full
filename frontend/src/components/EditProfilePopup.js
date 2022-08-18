import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  function hendleClickCloseButton() {
    onClose();
  }

  const currentUser = React.useContext(CurrentUserContext);
  const [user, setUser] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  function handleChengeInputUser(e) {
    setUser(e.target.value);
  }

  function handleChengeInputDescription(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setUser(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: user,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={hendleClickCloseButton}
      name="edit-profile"
      title="Редактировать профиль"
      textButton={"Сохранить"}
      onSubmit={handleSubmit}
    >
        <input
          onChange={handleChengeInputUser}
          value={user ? user : ""}
          className="form__input form__input_type_name"
          id="neme-input"
          type="text"
          name="name"
          placeholder="Введите имя"
          minLength={2}
          maxLength={40}
          required
          autoFocus
        />
        <span className="form__input-error neme-input-error" />
        <input
          onChange={handleChengeInputDescription}
          value={description ? description : ""}
          className="form__input form__input_type_sign"
          id="sign-input"
          type="text"
          name="sign"
          placeholder="Введите описание"
          minLength={2}
          maxLength={200}
          required
        />
        <span className="form__input-error sign-input-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
