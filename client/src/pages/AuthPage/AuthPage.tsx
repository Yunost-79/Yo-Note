import { useEffect, useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import AuthFloatingShape from '../../components/FloatingShape/AuthFloatingShape';

const AuthPage = () => {
  const getInitialLoginState = (): boolean => {
    return localStorage.getItem('isLogin') === 'true';
  };

  const [isLogin, setIsLogin] = useState<boolean>(getInitialLoginState);

  useEffect(() => {
    localStorage.setItem('isLogin', String(isLogin)); // Store as a string ('true'/'false')
  }, [isLogin]);

  return (
    <>
      <AuthFloatingShape />
      {isLogin ? <Login setIsLogin={setIsLogin} /> : <Register setIsLogin={setIsLogin} />}
    </>
  );
};

export default AuthPage;
