import { create } from 'zustand';
import { ETheme } from '../types/ETheme';

type ThemeState = {
  theme: boolean;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set) => {
  const savedTheme = localStorage.getItem('theme') === 'false';

  const toggleTheme = () => {
    set((state) => {
      const newTheme = !state.theme;
      document.body.id = newTheme ? ETheme.dark : ETheme.light;
      localStorage.setItem('theme', JSON.stringify(newTheme));
      return { theme: newTheme };
    });
  };

  return {
    theme: savedTheme ?? false,
    toggleTheme,
  };
});
