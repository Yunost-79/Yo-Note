import { useEffect, useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';

const AuthPage = () => {
  const getInitialLoginState = (): boolean => {
    return localStorage.getItem('isLogin') === 'true';
  };

  const [isLogin, setIsLogin] = useState<boolean>(getInitialLoginState);

  useEffect(() => {
    localStorage.setItem('isLogin', String(isLogin)); // Store as a string ('true'/'false')
  }, [isLogin]);

  return <>{isLogin ? <Login setIsLogin={setIsLogin} /> : <Register setIsLogin={setIsLogin} />}</>;
};

export default AuthPage;
