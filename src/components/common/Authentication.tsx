import React, { useContext } from "react";
// library
import { Redirect } from "react-router-dom";
// context
import AuthContext from "../../context/CommonProvider";
import RedirectContext from './../../context/RedirectContext';
// common
import { RouteName } from "../../common/Const";

type AuthProps = {
  children: React.ReactNode;
};

export const Authentication: React.FC<AuthProps> = ({ children }) => {
  const { uri } = useContext(RedirectContext);
  const { authState } = useContext(AuthContext);
  return (
    authState.isLogin ?
      <div>{children}</div> :
        uri.shop !== 0 ? 
        <Redirect to={`${RouteName.REGISTER}?from=${uri.fromPath}&shop=${uri.shop}`} />:
          <Redirect to={`${RouteName.REGISTER}?from=${uri.fromPath}`} />
  )
};
