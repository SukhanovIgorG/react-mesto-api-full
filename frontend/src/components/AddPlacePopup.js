import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onSubmitNewPlace }) {
  function hendleClickCloseButton() {
    onClose();
  }

  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(()=>{
    setTitle('');
    setLink('');
  },[isOpen, onClose])

  function handleChengeInputTitle(e) {
    setTitle(e.target.value);
  }

  function handleChengeInputLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onSubmitNewPlace({
      title: title,
      link: link,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={hendleClickCloseButton}
      name="edit-profile"
      title="Добавить место"
      textButton={"Сохранить"}
      onSubmit={handleSubmit}
    >
        <input
          onChange={handleChengeInputTitle}
          value={title ? title : ""}
          className="form__input form__input_type_place"
          id="place-input"
          type="text"
          name="name"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required
        />
        <span className="form__input-error place-input-error" />
        <input
          onChange={handleChengeInputLink}
          value={link ? link : ""}
          className="form__input form__input_type_photo"
          id="link-input"
          type="url"
          name="link"
          placeholder="ссылка на картинку"
          required
        />
        <span className="form__input-error link-input-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
