import React from "react";
import AuthPage from "../AuthPage/AuthPage";

function Register(props) {

  const [isOnRegisterPage, setIsOnRegisterPage] = React.useState(false);

  React.useEffect(() => {
    setIsOnRegisterPage(true);
    return () => setIsOnRegisterPage(false);
  }, [])

  return (
    <AuthPage
      textTitle="Добро пожаловать!"
      textButton="Зарегистрироваться"
      textQuestion="Уже зарегистрированы?"
      textLink="Войти"
      linkRoute="/signin"
      onSubmit={props.handleUserRegister}
      isOnRegisterPage={isOnRegisterPage}
      messageFromApi={props.messageFromApi}
      resetMessageFromApi={props.resetMessageFromApi}
      isLoading={props.isLoading}
    />
  );
}

export default Register;