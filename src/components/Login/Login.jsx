import React from "react";
import { useHistory, } from 'react-router-dom';
import AuthPage from "../AuthPage/AuthPage";

function Login(props) {

  const history = useHistory();

  const [isOnLoginPage, setIsOnLoginPage] = React.useState(false);

  React.useEffect(() => {
    if (props.loggedIn) { history.push('/'); }
    setIsOnLoginPage(true);

    return () => setIsOnLoginPage(false);
  }, [])

  return (
    <AuthPage
      textTitle="Рады видеть!"
      textButton="Войти"
      textQuestion="Ещё не зарегистрированы?"
      textLink="Регистрация"
      linkRoute="/signup"
      onSubmit={props.handleUserAuthorization}
      isOnLoginPage={isOnLoginPage}
      messageFromApi={props.messageFromApi}
      resetMessageFromApi={props.resetMessageFromApi}
      isLoading={props.isLoading}
    />
  );
}

export default Login;