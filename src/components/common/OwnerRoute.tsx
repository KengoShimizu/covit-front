import React, { useContext } from "react";
// library
import { Redirect, Route } from "react-router-dom";
// context
import AuthContext from "../../context/CommonProvider";
// other
import { OwnerType } from '../../common/Const'

export const OwnerRoute = ({ component: Component, ...rest }: any) => {
  const { authState } = useContext(AuthContext);
  return (
    <Route {...rest} render={props => (
      authState.user.is_owner !== OwnerType.NOTOWNER ? (
        <Component {...props} />
      ) : (
          <Redirect to='/'/>
        )
    )} />
  )
};