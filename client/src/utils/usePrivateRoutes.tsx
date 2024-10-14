import { ReactElement } from 'react';
import { Navigate } from 'react-router';
import { ERoutePaths } from '../types/ERoutePaths';

interface ProtectedRouteProps {
  children: ReactElement;
}

const usePrivateRoutes = () => {
  const isAuth = true;
  const PrivateRoute = ({ children }: ProtectedRouteProps) => {
    return isAuth ? children : <Navigate to={ERoutePaths.auth} />;
  };

  const AuthRoute = ({ children }: ProtectedRouteProps) => {
    return isAuth ? <Navigate to={ERoutePaths.main} /> : children;
  };

  return { PrivateRoute, AuthRoute };
};

export default usePrivateRoutes;
