import headerLogo from "../image/logo.svg";
import { useNavigate } from "react-router-dom";

function Header({ menu, button, onOpenMenu, onChengeButton, onLogin, loggedIn, onSetEmail, email, onSignOut }) {
  
  const navigate = useNavigate();

  function hendlerMenu() {
    onOpenMenu();
  }
  function handlerRelogin() {
    localStorage.removeItem("JWT");
    onLogin(false);
    onSetEmail("");
    onChengeButton('регистрация');
    navigate("/");
    onSignOut();
  }

  function handlerRegistration() {
    navigate("/signin");
    onChengeButton('регистрация');
  }

  function handlerLogin() {
    navigate("/signup");
    onChengeButton('вход');
  }

  function buttonHandler() {
   if (button === 'регистрация') {
      handlerLogin()
    } else if (button === 'вход') {
      handlerRegistration()
    } else {
      handlerRelogin()
    }
  }

  let statusMenu = menu;

  return (
    <div className="Header">
      <header className="header">
        <div className="header__container">
          <img className="header__logo" src={headerLogo} alt="логотип" />
          <button
            className={`header__button ${
              statusMenu && "header__button_type_closed"
            }`}
            onClick={hendlerMenu}
          ></button>
        </div>
        <div className={`menu ${statusMenu && "menu_visible"}`}>
          <span className="menu__user-mail">{loggedIn && email}</span>
          <button onClick={buttonHandler} className="menu__action-button">
            {button}
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;
