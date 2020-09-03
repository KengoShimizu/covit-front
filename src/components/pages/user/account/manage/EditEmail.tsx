import React, { useState, useContext, useEffect } from 'react';
// library
import axios from "axios";
// components
import HomeLayout from '../../../../templates/HomeLayout';
import Input, { InputThemes } from '../../../../atoms/Input';
import Button, { ButtonThemes } from '../../../../atoms/Button';
import Text, { TextThemes } from '../../../../atoms/Text';
// context
import AuthContext from "../../../../../context/CommonProvider";
// common
import { RouteName } from '../../../../../common/Const';
import Validation from './../../../../../common/Validate';

interface EditParam {
  email: string;
}

export const EditEmail: React.FC = (props: any) => {
  const { authState } = useContext(AuthContext);
  const [err, setErr] = useState("");
  const [editData, setEditData] = useState<EditParam>({
    email: ""
  });

  const send = async () => {
    try {
      await axios.post('/api/v1/common/sessions/sign_up', {
        email: props.location.state.email
      })
    } catch (error) {
      setErr('エラーが発生しました。もう一度お試しください。')
    }
  }

  // FIXME 終了後ページに飛ばす
  const putData = async () => {
    try {
      await axios.put(`/api/v1/user/users/update`, editData)
      props.history.push({
        pathname: RouteName.SEND,
        state: {
          email: editData.email,
          text: '登録',
          subTitle: 'メールアドレス登録',
          ref: RouteName.EDIT_EMAIL
        }
      });
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (event: any) => {
    setEditData({
      "email": event.target.value
    });
  }

  useEffect(() => {
    const errText = Validation.formValidate('email', editData.email);
    errText ? setErr(errText) : setErr('')
  }, [editData])

  return (
    <HomeLayout headerText="メールアドレスの編集" prevRef={RouteName.EDIT_LOGIN}>
      {/* FIXME リンク先 */}
      <div className="mail-form">
        <Input theme={InputThemes.DISABLED} label="現在のメールアドレス" placeholder="sample@sample.com" content={authState.user.email} propStyle={{ margin: '22px auto', padding: '1rem' }} readonly={true} />
        <Input theme={InputThemes.REQUIRED} label="新しいメールアドレス" placeholder="sample@sample.com" content={editData.email} handleChange={handleChange} propStyle={{ margin: '22px auto', padding: '1rem' }} />
        {err && <Text theme={[TextThemes.ERROR]} propStyle={{marginLeft: '15px'}}>{err}</Text>}
        <div className="mail-form_btn-container">
          <Button
            propStyle={{ margin: 'auto' }}
            theme={err ? [ButtonThemes.SUBNORMAL] : [ButtonThemes.NORMAL]}
            onClick={err ? () => { } : () => { putData(); send() }}>
            登録する
        </Button>
        </div>
      </div>
      <style jsx>{`
        .mail-form{
          max-width: 324px;
          width: 90%;
          margin: 40px auto 0;
        }
      `}</style>
    </HomeLayout>
  );
}