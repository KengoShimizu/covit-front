import React, { useState, useContext } from 'react';

type ModalState = {
  fromPath: string;
  setFromPath: any;
};

const RedirectContext = React.createContext<ModalState>({
  fromPath: '',
  setFromPath: () => {},
});
export default RedirectContext;

type ProviderProps = {
  children: React.ReactNode;
};

export const RedirectPathProvider: React.FC<ProviderProps> = ({ children }) => {
  const [fromPath, setFromPath] = useState(useContext(RedirectContext).fromPath);

  return (
    <RedirectContext.Provider value={{fromPath, setFromPath}}>
      {children}
    </RedirectContext.Provider>
  );
};