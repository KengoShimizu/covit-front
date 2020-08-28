import React, { useState, useContext } from 'react';

type ModalTopStateIsShown = {
  isModalTopShown: boolean;
  setIsModalTopShown: any;
};

type ModalTopStateText = {
  modalText: {
    caption: string;
    small?: string;
  };
  setModalText: any;
};

export const ModalTopContextIsShown = React.createContext<ModalTopStateIsShown>({
  isModalTopShown: false,
  setIsModalTopShown: () => {}
});

export const ModalTopContextText = React.createContext<ModalTopStateText>({
  modalText: {
    caption: '',
    small: ''
  },
  setModalText: () => {}
});

type ProviderProps = {
  children: React.ReactNode;
};

export const ModalTopStateProvider: React.FC<ProviderProps> = ({ children }) => {
  const [isModalTopShown, setIsModalTopShown] = useState(useContext(ModalTopContextIsShown).isModalTopShown);
  const [modalText, setModalText] = useState(useContext(ModalTopContextText).modalText);

  return (
    <ModalTopContextIsShown.Provider value={{isModalTopShown, setIsModalTopShown}}>
      <ModalTopContextText.Provider value={{modalText, setModalText}}>
      {children}
      </ModalTopContextText.Provider>
    </ModalTopContextIsShown.Provider>
  );
};