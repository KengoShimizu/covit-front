import React, { useContext } from "react";
// library
import { Redirect, Route } from "react-router-dom";
// context
import AuthContext from "../../context/CommonProvider";
import RedirectContext from './../../context/RedirectContext';
// common
import { OwnerType, RouteName } from '../../common/Const';

export const NotOwnerRoute = ({ component: Component, ...rest }: any) => {
  const { uri } = useContext(RedirectContext);
  const { authState } = useContext(AuthContext);
  return (
    authState.user.is_owner === OwnerType.NOT_OWNER ?
      <Route {...rest} component={Component}/>
      : uri.fromPath ? 
        <Redirect to={`${RouteName.SHOP}?from=${uri.fromPath}`} />
        :
        <Redirect to={RouteName.OWNER_ACCOUNT_TOP}/>
  )
};