import Cookies from 'js-cookie';
import { create } from 'zustand';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface AuthState {
  isAuth: boolean | null;
  loading: boolean;
  setIsAuth: (value: boolean) => void;
  checkAuth: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuth: Cookies.get('isAuth') === 'true' ? true : false,
  loading: false,
  setIsAuth: (value: boolean) => {
    Cookies.set('isAuth', JSON.stringify(value));
    set((state) => ({
      ...state,
      isAuth: value,
      loading: false,
    }));
  },
  checkAuth: async () => {
    set({ loading: true });
    const token = Cookies.get('jwt');

    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);

        const currentTime = Date.now() / 1000;

        if (decoded.exp && decoded.exp > currentTime) {
          Cookies.set('isAuth', 'true');
          set({ isAuth: true, loading: false });
        } else {
          Cookies.remove('jwt');
          Cookies.set('isAuth', 'false');
          set({ isAuth: false, loading: false });
        }
      } catch (error) {
        console.error('Invalid token:', error);
        Cookies.remove('jwt');
        Cookies.set('isAuth', 'false');
        set({ isAuth: false, loading: false });
      }
    } else {
      console.warn('No token found');
      Cookies.remove('jwt');
      Cookies.set('isAuth', 'false');
      set({ isAuth: false, loading: false });
    }
  },
  logout: () => {
    Cookies.remove('jwt');
    Cookies.set('isAuth', 'false');
    set({ isAuth: false, loading: false });
  },
}));
