import { createContext, useContext } from "react";

interface ContextProps {
  isMenuOpen: boolean;

  // Methods
  toggleSideMenu: () => void;
}

export const UiContext = createContext({} as ContextProps);

export const useUiContext = () => {
  return useContext(UiContext);
};
