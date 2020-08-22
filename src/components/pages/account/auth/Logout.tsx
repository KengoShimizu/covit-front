import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { HomeLayout } from './../../../organisms/HomeLayout';

export const Logout: React.FC = () => {
  const buttonRef = useRef(document.createElement("button"));
  const [loggedout, setLoggedout] = useState("");
  const [err, setErr] = useState("");

  const logout = async () => {
    const cookiesArray = document.cookie.split(';');
    let token: string = '';
    for (let c of cookiesArray) {
      const cArray: string[] = c.split('=');
      if (cArray[0].trim() === 'token') {
        token = cArray[1];
      }
    }
    await axios.get(`/api/v1/common/sessions/logout?token=${token}`)
      .then(res => setLoggedout(res.data.messages))
      .catch(err => setErr(err.response.data.errors));

    return;
  }

  return (
    <HomeLayout>
      <div className="">
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
    </HomeLayout>
  );
}