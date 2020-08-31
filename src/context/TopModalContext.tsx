import React, { useState, useContext } from 'react';

type TopModalStateIsShown = {
  isTopModalShown: boolean;
  setIsTopModalShown: any;
};

type TopModalStateText = {
  modalText: {
    caption: string;
    small?: string;
  };
  setModalText: any;
};

export const TopModalContextIsShown = React.createContext<TopModalStateIsShown>({
  isTopModalShown: false,
  setIsTopModalShown: () => {}
});

export const TopModalContextText = React.createContext<TopModalStateText>({
  modalText: {
    caption: '',
    small: ''
  },
  setModalText: () => {}
});

type ProviderProps = {
  children: React.ReactNode;
};

export const TopModalStateProvider: React.FC<ProviderProps> = ({ children }) => {
  const [isTopModalShown, setIsTopModalShown] = useState(useContext(TopModalContextIsShown).isTopModalShown);
  const [modalText, setModalText] = useState(useContext(TopModalContextText).modalText);

  return (
    <TopModalContextIsShown.Provider value={{isTopModalShown, setIsTopModalShown}}>
      <TopModalContextText.Provider value={{modalText, setModalText}}>
      {children}
      </TopModalContextText.Provider>
    </TopModalContextIsShown.Provider>
  );
};