import React, { useContext, useEffect, useState, useCallback } from "react";
import { Redirect } from "react-router-dom";
import useReactRouter from "use-react-router";

import { AuthContext } from "../../context/CommonProvider";

import axios from "axios";

type AuthProps = {
  children: React.ReactNode;
};

export const Authentication: React.FC<AuthProps> = ({ children }) => {
  const { authState, setAuth } = useContext(AuthContext);
  const path = useReactRouter().location.pathname;
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(false);

  const setAuthData = useCallback(async () => {
    try {
      let TokenInCookie = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + TokenInCookie;
      fetchCurrentUser().then(res => {
        if(res){
          setAuth({
            ...authState,
            isLogin: true,
            user: res
          });
          setLogin(true);
        } else {
          setLogin(false);
        }
      })
      .catch(error => setLogin(false))
      .finally(() => setLoading(false));
    } catch (error) {
      console.log(error);
      axios.defaults.headers.common['Authorization'] = '';
      setLogin(false);
      setLoading(false);
    }
  }, []);

  async function fetchCurrentUser() {
    let response = await axios
      .get(`/api/v1/common/users/me`)
      .then(result => result.data)
      .catch(error => console.log(error))

    if (!response) throw "Login Error";

    return response;
  }

  useEffect(() => {
    setLoading(true);
    setAuthData();
  }, [path]);

  return(
    loading ? <div></div> :
      login ?
        <div>{children}</div> :
          <Redirect to={"/accounts/login"}/>
  )
};
