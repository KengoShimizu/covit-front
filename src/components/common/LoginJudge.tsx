import React, { useContext, useEffect, useState, useCallback } from "react";
// library
import useReactRouter from "use-react-router";
import axios from "axios";
import Cookies from 'universal-cookie';
// context
import AuthContext from "../../context/CommonProvider";

type AuthProps = {
  children: React.ReactNode;
};

export const LoginJudge: React.FC<AuthProps> = ({ children }) => {
  const cookies = new Cookies();
  const { authState, setAuth } = useContext(AuthContext);
  const path = useReactRouter().location.pathname;
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(false);

  const setAuthData = useCallback(async (TokenInCookie: string) => {
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + TokenInCookie;
      fetchCurrentUser().then(res => {
        if (res) {
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
    const TokenInCookie = cookies.get('token');
    if (TokenInCookie) {
      setLoading(true);
      setAuthData(TokenInCookie);
    } else {
      setLoading(false);
      setLogin(false);
    }
  }, [path]);

  return (
    loading ? <div></div> :
      <div>{children}</div>
  )
};
