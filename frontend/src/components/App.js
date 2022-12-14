/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import * as Auth from "../utils/ApiAuth";

// components
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import Register from "./Register";
import Login from "./Login";
import api from "../utils/Api";
import { CurrentUserContext } from "../context/CurrentUserContext";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  // state 
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [isPopupWithImageOpen, setIsPopupWithImageOpen] = React.useState(false);
  const [isHeaderMenu, setIsHeaderMenu] = React.useState(true)
  const [isToolTipVisible, setIsToolTipVisible] = React.useState(false)
  const [isToolTipStatus, setIsToolTipStatus] = React.useState(true)
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [headerButton, setHeaderButton] = useState('регистрация');

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link
  const navigate = useNavigate();
  const jwt = localStorage.getItem("JWT");

  function chengeHeaderButton(text) {
    setHeaderButton(text)
  };

  React.useEffect(()=>{
    if (jwt) {
      Auth.autorization(jwt);
      setLoggedIn(true);
      setEmail(currentUser.email);
      chengeHeaderButton('выйти'); 
    } else {
      console.log('jwt не найден, текущийПользователь');
      setCurrentUser({});
      setLoggedIn(false);
      navigate("/signin");
    }
  }, [])

  React.useEffect(()=>{
    if (loggedIn) {
      Promise.all([api.loadUserInfo(), api.getInitialCards()])
      .then(([data, cards])=> {
        console.log(data.user.email);
        setCurrentUser(data.user);
        setEmail(data.user.email);
        chengeHeaderButton('выйти');
        setCards(cards.card);
        console.log('авторизация выполнена');
      })
      .then(()=>{
        navigate("/main");
      })
      .catch((err) => {
        console.log(`ошибка. нет JWT. Сообщение: ${err}`)});
    } else {
      console.log('авторизация не выполнена');
    } 
  }, [loggedIn])

  function handleCardLike(card) {
    const isLiked = Array.isArray(card.likes) ? card.likes.includes(currentUser._id) : false;
    !isLiked
      ? api.addLike(card).then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard.card : c))
          );
        }).catch((err) => {
          console.log(`ошибка добавления лайка ${err}`);
        })
      : api.removeLike(card).then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard.card : c))
          );
        }).catch((err) => {
          console.log(`ошибка удаления лайка ${err}`);
        })
    // Отправляем запрос в API и получаем обновлённые данные карточки
  };

  function deleteCard(card) {
    setCards(cards => cards.filter((item) => item._id !== card._id) )
  }

  function handleCardDelete(card) {
    api.trashCard(card).then(() => {
      deleteCard(card);
    }).catch((err) => {
      console.log(`ошибка удаления карты ${err}`);
    })
  }

  function hendlerMenu () {
    setIsHeaderMenu(!isHeaderMenu)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleImageClick(card) {
    setSelectedCard({ name: card.name, link: card.link });
    setIsPopupWithImageOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPopupWithImageOpen(false);
    setSelectedCard({ name: "", link: "" });
    setIsToolTipVisible(false);
  }

  React.useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 

  function handleUpdateUser({ name, about }) {
    api.postUserInfo({ name, about }).then(()=>{
      setCurrentUser({ name: name, about: about, avatar: currentUser.avatar });
    }).then(()=> {closeAllPopups()}).catch((err) => {
      console.log(`ошибка изменения данных юзера ${err}`);
    });
  }

  function handleUpdateAvatar(link) {
    api.postUserAvatar(link).then(()=>{
      setCurrentUser({ avatar: link, name: currentUser.name, about: currentUser.about })
    }).then(()=> {closeAllPopups()}).catch((err) => {
      console.log(`ошибка изменения аватара ${err}`);
    })
  }

  function handlerSubmitNewPlace({ title, link }) {
    api.postNewCard(title, link).then((newCard) => {
      setCards([newCard.card, ...cards]);
    }).then(()=> {closeAllPopups()}).catch((err) => {
      console.log(`ошибка добавления нового места ${err}`);
    });
  }

  function handleLogin (status) {
    setLoggedIn(status);
  }

  function hendleSetEmail (email) {
    setEmail(email)
  }

  function handleSignOut () {
    setCurrentUser({
      _id: '',
    });
  }

  return (
    <div className="App root">
      <CurrentUserContext.Provider value={currentUser}>
        <Header onLogin={handleLogin} loggedIn={loggedIn} menu={isHeaderMenu} button={headerButton} onChengeButton={chengeHeaderButton} onOpenMenu={hendlerMenu} onSetEmail={hendleSetEmail} email={email} onSignOut={handleSignOut}/>
        < InfoTooltip message={isToolTipVisible} status={isToolTipStatus} onClose={closeAllPopups}/>
        <Routes>
          <Route path="/signup" element={<Register onToolTipVisible={setIsToolTipVisible} onToolTipStatus={setIsToolTipStatus}/>} />
          <Route path="/signin" element={<Login onLogin={handleLogin} onToolTipVisible={setIsToolTipVisible} onToolTipStatus={setIsToolTipStatus}/>} />
          <Route path="/*"  element={loggedIn ? <Navigate replace to="/signin" /> : <Navigate replace to="/main" /> } />
          <Route exact path='/main' element={<ProtectedRoute loggedIn={loggedIn}/>}>
            <Route exact path='/main' element={
                <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleImageClick}
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
                cards={cards}
              />
            }/>
          </Route>
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onSubmitNewPlace={handlerSubmitNewPlace}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isPopupWithImageOpen}
          onClose={closeAllPopups} 
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
