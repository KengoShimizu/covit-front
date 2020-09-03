import React, { useState, useContext } from 'react';


type TopModalState = {
  contents: {
    isShown: boolean;
    text: {
      caption: string;
      small?: string;
    }
  };
  setContents: any;
};

const TopModalContext = React.createContext<TopModalState>({
  contents: {
    isShown: false,
    text: {
      caption: '',
      small: '',
    }
  },
  setContents: () => {}
});
export default TopModalContext;

type ProviderProps = {
  children: React.ReactNode;
};

export const TopModalProvider: React.FC<ProviderProps> = ({ children }) => {
  const [contents, setContents] = useState(useContext(TopModalContext).contents);

  return (
    <TopModalContext.Provider value={{contents, setContents}}>
      {children}
    </TopModalContext.Provider>
  );
};