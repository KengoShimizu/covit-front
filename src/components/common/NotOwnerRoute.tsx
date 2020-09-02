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
    <Route {...rest} render={props => (
      !authState.isLogin || authState.user.is_owner === OwnerType.NOT_OWNER ? (
        <Component {...props} />
      ) : (
          <Redirect to={RouteName.ACCOUNT_TOP}/>
        )
    )} />
  )
};