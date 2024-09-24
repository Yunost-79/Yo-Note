import { useEffect } from 'react';
import { Route, Routes } from 'react-router';

import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/AuthPage/LoginPage';
import RegisterPage from './pages/AuthPage/RegisterPage';

import AuthFloatingShape from './components/FloatingShape/AuthFloatingShape';

import { useThemeStore } from './zustand/useThemeStore';
import usePrivateRoutes from './utils/usePrivateRoutes';
import { ERoutePaths } from './types/ERoutePaths';

import { ETheme } from './types/ETheme';

import './App.scss';

const App = () => {
  const { ProtectedRoute, AuthRoute } = usePrivateRoutes();
  const { theme } = useThemeStore();

  useEffect(() => {
    document.body.id = theme ? ETheme.dark : ETheme.light;
  }, [theme]);

  return (
    <div className="App">
      <div className="wrapper">
        <AuthFloatingShape />
        <Routes>
          <Route
            path={ERoutePaths.main}
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />


          <Route
            path={ERoutePaths.login}
            element={
              <AuthRoute>
                <LoginPage />
              </AuthRoute>
            }
          />
          <Route
            path={ERoutePaths.register}
            element={
              <AuthRoute>
                <RegisterPage />
              </AuthRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
