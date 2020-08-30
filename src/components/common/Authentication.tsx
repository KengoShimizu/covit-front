import React, { useContext } from "react";
// library
import { Redirect } from "react-router-dom";
// context
import AuthContext from "../../context/CommonProvider";

type AuthProps = {
  children: React.ReactNode;
};

export const Authentication: React.FC<AuthProps> = ({ children }) => {
  const { authState } = useContext(AuthContext);

  return (
    authState.isLogin ?
      <div>{children}</div> :
      <Redirect to={"/accounts/login"} />
  )
};
