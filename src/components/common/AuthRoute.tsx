import React, { useContext } from "react";
// library
import { Route, Redirect } from "react-router-dom";
// context
import AuthContext from "../../context/CommonProvider";
// common
import { RouteName } from '../../common/Const';

export const AuthRoute = ({ component: Component, ...rest }: any) => {
  const { authState } = useContext(AuthContext);
  return (
    authState.isLogin ?
      <Route {...rest} component={Component}/>
      : 
      <Redirect to={RouteName.ROOT} />
  );
};