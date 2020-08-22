import React, { useState, useContext } from "react";
import { User } from "./../types/User";

type AuthState = {
  authState: {
    isLogin: boolean;
    user: User;
  };
  setAuth: any;
};

export const AuthContext = React.createContext<AuthState>({
  authState: {
    isLogin: false,
    user: {
      id: 0,
      name: "",
      kana_name: "",
      email: "",
      image: "",
      token: "",
      status: 0,
      is_admin: 0,
      is_owner: 0,
      created_at: "",
      updated_at: ""
    }
  },
  setAuth: () => {}
});

export const AuthProvider = AuthContext.Provider;

type ProviderProps = {
  children: React.ReactNode;
};

export const CommonProvider: React.FC<ProviderProps> = ({ children }) => {
  const [authState, setAuth] = useState(useContext(AuthContext).authState);

  return (
    <AuthProvider value={{ authState, setAuth }}>
      {children}
    </AuthProvider>
  );
};
