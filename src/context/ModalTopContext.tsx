import React, { useState, useContext } from 'react';

type ModalTopState_isShown = {
  isModalTopShown: boolean;
  setIsModalTopShown: any;
};

type ModalTopState_text = {
  modalText: string;
  setModalText: any;
};

export const ModalTopContext_isShown = React.createContext<ModalTopState_isShown>({
  isModalTopShown: false,
  setIsModalTopShown: () => {}
});

export const ModalTopContext_text = React.createContext<ModalTopState_text>({
  modalText: '',
  setModalText: () => {}
});

type ProviderProps = {
  children: React.ReactNode;
};

export const ModalTopStateProvider: React.FC<ProviderProps> = ({ children }) => {
  const [isModalTopShown, setIsModalTopShown] = useState(useContext(ModalTopContext_isShown).isModalTopShown);
  const [modalText, setModalText] = useState(useContext(ModalTopContext_text).modalText);

  return (
    <ModalTopContext_isShown.Provider value={{isModalTopShown, setIsModalTopShown}}>
      <ModalTopContext_text.Provider value={{modalText, setModalText}}>
      {children}
      </ModalTopContext_text.Provider>
    </ModalTopContext_isShown.Provider>
  );
};