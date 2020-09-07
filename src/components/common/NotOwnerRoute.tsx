import React, { useContext } from "react";
// library
import { Redirect, Route } from "react-router-dom";
// context
import AuthContext from "../../context/CommonProvider";
// common
import { OwnerType, RouteName } from '../../common/Const';

export const NotOwnerRoute = ({ component: Component, ...rest }: any) => {
  const { authState } = useContext(AuthContext);
  return (
    authState.user.is_owner === OwnerType.NOT_OWNER ?
      <Route {...rest} component={Component}/>
      : 
      <Redirect to={RouteName.OWNER_ACCOUNT_TOP}/>
  )
};