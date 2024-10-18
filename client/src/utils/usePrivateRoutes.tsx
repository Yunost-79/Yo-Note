import { useEffect } from 'react';
import { Navigate } from 'react-router';
import { ERoutePaths } from '../types/ERoutePaths';
import { useAuthStore } from '../zustand/AuthStore/useAuthStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const usePrivateRoutes = () => {
  const { isAuth, checkAuth, loading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const PrivateRoute = ({ children }: ProtectedRouteProps) => {
    if (loading) return null;
    return isAuth ? <>{children}</> : <Navigate to={ERoutePaths.auth} />;
  };

  const AuthRoute = ({ children }: ProtectedRouteProps) => {
    if (loading) return null;
    return isAuth ? <Navigate to={ERoutePaths.main} /> : <>{children}</>;
  };

  return { PrivateRoute, AuthRoute };
};

export default usePrivateRoutes;
