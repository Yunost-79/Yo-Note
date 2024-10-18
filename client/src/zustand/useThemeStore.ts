import { create } from 'zustand';
import Cookies from 'js-cookie';
import { ETheme } from '../types/ETheme';

type ThemeState = {
  theme: boolean;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: Cookies.get('theme') === 'false',
  toggleTheme: () => {
    set((state) => {
      const newTheme = !state.theme;
      document.body.id = newTheme ? ETheme.dark : ETheme.light;
      Cookies.set('theme', JSON.stringify(newTheme));
      return { theme: newTheme };
    });
  },
}));
