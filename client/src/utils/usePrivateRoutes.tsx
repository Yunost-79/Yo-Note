import { Navigate } from 'react-router';
import { ReactElement } from 'react';
// import { useCookies } from 'react-cookie';
import { ERoutePaths } from '../types/ERoutePaths';

interface ProtectedRouteProps {
  children: ReactElement;
}

const usePrivateRoutes = () => {
  const isAuth = false;

  const ProtectedRoute = (props: ProtectedRouteProps) => {
    const { children } = props;
    return isAuth ? children : <Navigate to={ERoutePaths.login} />;
  };

  const AuthRoute = (props: ProtectedRouteProps) => {
    const { children } = props;
    return isAuth ? <Navigate to={ERoutePaths.main} /> : children;
  };

  return { ProtectedRoute, AuthRoute };
};

export default usePrivateRoutes;
