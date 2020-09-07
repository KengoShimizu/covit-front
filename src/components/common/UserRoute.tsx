import React, { useContext } from "react";
// library
import { Route, Redirect } from "react-router-dom";
// context
import AuthContext from "../../context/CommonProvider";
import RedirectContext from './../../context/RedirectContext';
// common
import { OwnerType, RouteName } from '../../common/Const';

export const UserRoute = ({ component: Component, ...rest }: any) => {
  const { uri } = useContext(RedirectContext);
  const { authState } = useContext(AuthContext);
  return (
    authState.isLogin && authState.user.is_owner === OwnerType.NOT_OWNER ?
      <Route {...rest} component={Component}/>
      : uri.shop !== 0 ? 
        <Redirect to={`${RouteName.REGISTER}?from=${uri.fromPath}&shop=${uri.shop}`} />:
          <Redirect to={`${RouteName.REGISTER}?from=${uri.fromPath}`} />
  );
};