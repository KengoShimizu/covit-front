import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

export const Login: React.FC = (props: any) => {
    const mailRef = useRef(document.createElement("input"));
    const buttonRef = useRef(document.createElement("button"));
    const [err, setErr] = useState("");

    const send = async () => {
        await axios.post(
            '/api/v1/common/sessions/login',
            {
                email: mailRef.current.value
            }
        )
        .then(res => res.data)
        .catch(err => setErr(err.response.data.errors[0]));

        if(!err){
        props.history.push({
            pathname: "/accounts/send",
            state: { 
                email: mailRef.current.value,
                text: 'ログイン'
            }
        });
        }

        return;

      }

    return (
        <div className="form">
            <div className="err">{err}</div>
            <div className="mail-form">
              <label>メールアドレス</label>
              <input ref={ mailRef } type="text" placeholder="メールアドレス"/>
            </div>
            <div className="button-container">
            <button ref={ buttonRef } onClick={ send }>
              ログインする
            </button>
            </div>
            <Link to='/accounts/register'>Register</Link>
        </div>
    );
}