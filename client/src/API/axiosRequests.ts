import { useAuthStore } from '../zustand/AuthStore/useAuthStore';
import { useUserStore } from '../zustand/UserStore/useUserStore';
import { instance } from './axiosInstance';
import { LoginUserData, RegisterUserData } from './axiosRequests.types';
import { catchErrorHandler } from './helpersAPI';

const { isAuth, setIsAuth } = useAuthStore.getState();
const { cleanUser, setUser } = useUserStore.getState();

// ======= AUTH ======
export const register = async (userData: RegisterUserData) => {
  try {
    const { data } = await instance.post('/auth/register', userData);

    if (data.error) {
      throw new Error(data.error);
    }

    if (data && !isAuth) {
      setIsAuth(true);
    }
    return;
  } catch (e) {
    catchErrorHandler(e, 'Register');
  }
};

export const login = async (userData: LoginUserData) => {
  try {
    const { data } = await instance.post('/auth/login', userData);

    if (data.error) {
      throw new Error(data.error);
    }
    if (data && !isAuth) {
      setIsAuth(true);
    }
    console.log('login data:', data);

    return data;
  } catch (e) {
    catchErrorHandler(e, 'Login');
  }
};

export const logout = async () => {
  try {
    const { data } = await instance.post('/auth/logout');

    if (data && isAuth) {
      setIsAuth(false);
      cleanUser();
    }
    console.log('logout data:', data);
    return;
  } catch (e) {
    catchErrorHandler(e, 'Logout');
  }
};

// ======= USER DATA ======

export const getUserData = async () => {
  try {
    const { data } = await instance.get('/user/data');
    setUser({ ...data.user, user: data.user });
    return;
  } catch (e) {
    catchErrorHandler(e, 'Get user data');
  }
};
