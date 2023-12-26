import { MutableRefObject, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthClient } from "../../api/authClient";
import { Spinner } from "../Spinner/Spinner";
import { handleAlertMessage } from "../../utils/auth";
import "./styles.css";

export const AuthPage = ({ type }: { type: "login" | "registration" }) => {
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();
  const usernameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const currentAuthTitle = type === "login" ? "Войти" : "Регистрация";

  const handleAuthResponse = (
    result: boolean | undefined,
    navigatePath: string,
    alertText: string
  ) => {
    if (!result) {
      setSpinner(false);

      return;
    }

    setSpinner(false);
    navigate(navigatePath);
    handleAlertMessage({ alertText, alertStatus: "success" });
  };

  const handleLogin = async (username: string, password: string) => {
    if (!username || !password) {
      setSpinner(false);
      handleAlertMessage({
        alertText: "Все поля обязательны",
        alertStatus: "warning",
      });
      return;
    }

    const result = await AuthClient.login(username, password);

    if (!result) {
      setSpinner(false);
      handleAlertMessage({
        alertText: "Введите правильное имя пользователя или пароль",
        alertStatus: "warning",
      });
      return;
    }

    handleAuthResponse(result, "/costs", "Вход выполнен");
  };

  const handleRegistration = async (username: string, password: string) => {
    if (!username || !password) {
      setSpinner(false);
      handleAlertMessage({
        alertText: "Все поля обязательны",
        alertStatus: "warning",
      });
      return;
    }

    if (password.length < 5) {
      setSpinner(false);
      handleAlertMessage({
        alertText: "Пароль должен быть не менее 5 символов",
        alertStatus: "warning",
      });
      return;
    }

    const result = await AuthClient.registration(username, password);

    if (!result) {
      setSpinner(false);
      handleAlertMessage({
        alertText: "Пользователь с таким именем уже существует",
        alertStatus: "warning",
      });
      return;
    }

    handleAuthResponse(result, "/login", "Регистрация выполнена");
  };

  const handleAuth = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSpinner(true);

    switch (type) {
      case "login":
        handleLogin(usernameRef.current.value, passwordRef.current.value);
        break;
      case "registration":
        handleRegistration(
          usernameRef.current.value,
          passwordRef.current.value
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <h1 className="title">{currentAuthTitle}</h1>
      <form onSubmit={handleAuth}>
        <label className="auth-label">
          <p> Введите имя пользователя</p>
          <input ref={usernameRef} type="text" className="form-control" />
        </label>
        <label className="auth-label">
          <p>Введите пароль</p>
          <input ref={passwordRef} type="password" className="form-control" />
        </label>
        <button className="btn btn-primary auth-btn">
          {spinner ? <Spinner top={5} left={20} /> : currentAuthTitle}
        </button>
      </form>
      {type === "login" ? (
        <div>
          {" "}
          <span className="question-text">Еще нет аккаунта?</span>
          <Link to={"/registration"}>Зарегистрироваться</Link>
        </div>
      ) : (
        <div>
          {" "}
          <span className="question-text">Уже есть аккаунт?</span>
          <Link to={"/login"}>Войти</Link>
        </div>
      )}
    </div>
  );
};
