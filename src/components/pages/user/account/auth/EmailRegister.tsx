import React, { useState } from 'react';
// library
import { Link } from 'react-router-dom';
import axios from "axios";
// components
import HomeLayout from '../../../../templates/HomeLayout';
import Input, { InputThemes } from '../../../../atoms/Input';
import Button, { ButtonThemes } from '../../../../atoms/Button';

interface AddParam {
  email: string;
}

export const EmailRegister: React.FC = (props: any) => {
  const [err, setErr] = useState("");
  const [addData, setAddData] = useState<AddParam>({
    email: ""
  });

  const handleChange = (event: any) => {
    setAddData({
      "email": event.target.value
    });
  }

  const send = async () => {
    await axios.post('/api/v1/common/sessions/sign_up', addData)
      .then(res => res.data)
      .catch(err => setErr(err.response.data.errors[0]));

    if (!err) {
      props.history.push({
        pathname: "/accounts/send",
        state: {
          email: addData.email,
          text: '登録'
        }
      });
    }
    return;
  }

  return (
    <HomeLayout headerText="メールアドレス登録" prevRef="#" history={props.history}>
      {/* FIXME リンク先 */}
      <Input theme={InputThemes.REQUIRED} label="メールアドレス" placeholder="sample@sample.com" content={addData.email} handleChange={handleChange} propStyle={{margin: '32px auto'}}/>
      <Button theme={[ButtonThemes.NORMAL]} onClick={send} propStyle={{margin: '16px auto'}}>登録する</Button>
      <div style={{textAlign: "right" }}>
        <Link to='/accounts/login'>ログインはこちら＞</Link>
      </div>
    </HomeLayout>
  );
}