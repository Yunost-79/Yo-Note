import { useEffect } from 'react';
import { Route, Routes } from 'react-router';

import MainPage from './pages/MainPage/MainPage';
import AuthPage from './pages/AuthPage/AuthPage';
import ErrorPageNotFound from './pages/ErrorPage/ErrorPageNotFound';

import AuthFloatingShape from './components/FloatingShape/AuthFloatingShape';

import PrivateRoute from './utils/usePrivateRoutes';
import { useThemeStore } from './zustand/useThemeStore';
import { ERoutePaths } from './types/ERoutePaths';

import { ETheme } from './types/ETheme';

import './App.scss';

const App = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.body.id = theme ? ETheme.dark : ETheme.light;
  }, [theme]);

  return (
    <div className="App">
      <div className="wrapper">
        <AuthFloatingShape />
        <Routes>
          <Route path={ERoutePaths.auth} element={<AuthPage />} />

          <Route element={<PrivateRoute />}>
            <Route path={ERoutePaths.main} element={<MainPage />} />
          </Route>

          <Route path="*" element={<ErrorPageNotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
