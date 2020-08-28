import React, { useState, useContext } from 'react';

type ModalState = {
  isModalShown: boolean;
  toggleModalShown: any;
};

export const ModalContext = React.createContext<ModalState>({
  isModalShown: false,
  toggleModalShown: () => {},
});

type ProviderProps = {
  children: React.ReactNode;
};

export const ModalStateProvider: React.FC<ProviderProps> = ({ children }) => {
  const [isModalShown, toggleModalShown] = useState(useContext(ModalContext).isModalShown);

  return (
    <ModalContext.Provider value={{isModalShown, toggleModalShown}}>
      {children}
    </ModalContext.Provider>
  );
};