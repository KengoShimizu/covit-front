import React, { useState, useContext } from 'react';

type ModalState = {
  uri: {
    fromPath: string;
    shop?: number;
  }
  setUri: any;
};

const RedirectContext = React.createContext<ModalState>({
  uri: {
    fromPath: '',
    shop: 0,
  },
  setUri: () => {},
});
export default RedirectContext;

type ProviderProps = {
  children: React.ReactNode;
};

export const RedirectPathProvider: React.FC<ProviderProps> = ({ children }) => {
  const [uri, setUri] = useState(useContext(RedirectContext).uri);

  return (
    <RedirectContext.Provider value={{ uri, setUri }}>
      {children}
    </RedirectContext.Provider>
  );
};