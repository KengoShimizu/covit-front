import React, { useRef, useState } from 'react';
import {CommonStyle} from './../../../../common/CommonStyle';
import { Link } from 'react-router-dom';
import axios from "axios";
import { HomeLayout } from '../../../templates/HomeLayout';
import Cookies from 'universal-cookie';

export const Logout: React.FC = () => {
  const cookies = new Cookies();
  const buttonRef = useRef(document.createElement("button"));
  const [loggedout, setLoggedout] = useState("");
  const [err, setErr] = useState("");

  const logout = async () => {
    await axios.get(`/api/v1/common/sessions/logout?token=${cookies.get('token')}`)
      .then(res => setLoggedout(res.data.messages))
      .catch(err => setErr(err.response.data.errors));
    return;
  }

  return (
    <HomeLayout>
      <div className="container">
        {loggedout !== 'ok' ?
          <React.Fragment>
            <div className="err">{err}</div>
            <div className="button-container">
              <button ref={buttonRef} onClick={logout}>
                ログアウトする
                    </button>
            </div>
          </React.Fragment>
          :
          <React.Fragment>
            ログアウトしました。
                </React.Fragment>
        }
        <Link to='/'>Top</Link>
      </div>
      <style jsx>{`
        .container{
        }
      `}</style>
    </HomeLayout>
  );
}