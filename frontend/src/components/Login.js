import { useState } from "react";
import * as Auth from "../utils/ApiAuth";
import { useNavigate } from "react-router-dom";

function Login({ onLogin, onToolTipVisible, onToolTipStatus }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(status) {
    onLogin(status);
  }

  function handleInputEmail(e) {
    setEmail(e.target.value);
  }

  function handleInputPassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    Auth.login({ email, password }).then((data) => {
      handleLogin(true);
      setEmail("");
      setPassword("");
      navigate("/main");
    }).catch((err)=>{
      onToolTipVisible(true);
      onToolTipStatus(false);
      console.log('ошибка входа ' + err)
    });
  }

  return (
    <div className="dialog">
      <div className="dialog__container">
        <h2 className="dialog__header">Вход</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email ? email : ''}
            onChange={handleInputEmail}
            className="dialog__input"
            placeholder="email"
          ></input>
          <input
            type="password"
            value={password ? password : ''}
            onChange={handleInputPassword}
            className="dialog__input"
            placeholder="пароль"
          ></input>
          <button className="dialog__button dialog__button_type_reg">
            Войти
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="dialog__button dialog__button_type_log"
          >
            Еще не зарегистрированы. Регистрация?
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
