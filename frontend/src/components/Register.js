import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Auth from "../utils/ApiAuth";

function Register( { onToolTipVisible, onToolTipStatus } ) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleInputEmail(e) {
    setEmail(e.target.value);
  }

  function handleInputPassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    console.log("сабмит");
    e.preventDefault();
    Auth.register({ email, password }).then(() => {
      setEmail("");
      setPassword("");
      navigate("signin");
    })
    .then(()=>{
      onToolTipVisible(true);
      onToolTipStatus(true);
    })
    .catch(()=> {
      onToolTipVisible(true);
      onToolTipStatus(false);
    });
  }

  return (
    <div className="dialog">
      <div className="dialog__container">
        <h2 className="dialog__header">Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={handleInputEmail}
            className="dialog__input"
            placeholder="email"
          ></input>
          <input
            type="password"
            value={password}
            onChange={handleInputPassword}
            className="dialog__input"
            placeholder="пароль"
          ></input>
          <button
            type="submit"
            className="dialog__button dialog__button_type_reg"
          >
            Зарегистрироваться
          </button>
          <button
            onClick={() => navigate("signin")}
            className="dialog__button dialog__button_type_log"
          >
            Уже зарегистрированы. Войти?
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
