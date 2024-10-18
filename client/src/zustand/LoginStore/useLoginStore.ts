import { create } from 'zustand';
import Cookies from 'js-cookie';

interface LoginState {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  removeIsLogin: () => void;
}

export const useLoginStore = create<LoginState>((set) => ({
  isLogin: true,
  setIsLogin: (isLogin: boolean) => {
    Cookies.set('isLogin', String(isLogin));
    set({ isLogin });
  },
  removeIsLogin: () => {
    Cookies.remove('isLogin');
  },
}));
