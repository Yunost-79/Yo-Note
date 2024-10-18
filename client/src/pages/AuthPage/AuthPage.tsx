import { useEffect } from 'react';

import Login from './components/Login';
import Register from './components/Register';
import { useLoginStore } from '../../zustand/LoginStore/useLoginStore';
import AuthFloatingShape from '../../components/FloatingShape/AuthFloatingShape';

const AuthPage = () => {
  const { isLogin, setIsLogin } = useLoginStore();

  useEffect(() => {
    setIsLogin(isLogin);
  }, [isLogin, setIsLogin]);

  return (
    <>
      <AuthFloatingShape />
      {isLogin ? <Login setIsLogin={setIsLogin} /> : <Register setIsLogin={setIsLogin} />}
    </>
  );
};

export default AuthPage;
