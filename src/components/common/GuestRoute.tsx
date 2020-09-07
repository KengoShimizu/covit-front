import React, { useContext } from "react";
// library
import { Route, Redirect } from "react-router-dom";
// context
import AuthContext from "../../context/CommonProvider";
import RedirectContext from './../../context/RedirectContext';
// common
import { OwnerType, RouteName } from '../../common/Const';

export const GuestRoute = ({ component: Component, ...rest }: any) => {
  const { authState } = useContext(AuthContext);
  return (
    !authState.isLogin ?
      <Route {...rest} component={Component}/>
      : authState.user.is_owner === OwnerType.NOT_OWNER ?
          <Redirect to={RouteName.ROOT} />
          :
          <Redirect to={RouteName.OWNER_ACCOUNT_TOP} />
  );
};