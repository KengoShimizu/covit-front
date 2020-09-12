import React, { useState, useContext, useEffect } from 'react';
// library
import axios from "axios";
// components
import HomeLayout from '../../../templates/HomeLayout';
import Input, { InputThemes } from '../../../atoms/Input';
import Button, { ButtonThemes } from '../../../atoms/Button';
import Text, { TextThemes } from './../../../atoms/Text';
// context
import AuthContext from "../../../../context/CommonProvider";
// common
import { RouteName } from '../../../../common/Const';
import Validate from '../../../../common/Validate';

interface EditParam {
  email: string;
}

const EditEmail: React.FC = (props: any) => {
  const { authState } = useContext(AuthContext);
  const [isOK, setIsOK] = useState(false);
  const [err, setErr] = useState("");
  const [editData, setEditData] = useState<EditParam>({
    email: ""
  });

  const send = async () => {
    try {
      setIsOK(false)
      await axios.put(`/api/v1/common/users/update_email`, editData)
      props.history.push({
        pathname: RouteName.SEND,
        state: {
          email: editData.email,
          text: 'メールアドレスの変更',
          subTitle: 'メールアドレス変更',
          ref: RouteName.EDIT_EMAIL
        }
      });
    } catch (error) {
      if (error.message.match(/400/g)) {
        setErr('既に登録されたメールアドレスです。')
      } else {
        setErr('エラーが発生しました。もう一度お試しください。')
      }
    }
  }

  const handleChange = (event: any) => {
    setEditData({
      "email": event.target.value
    });
  }

  useEffect(() => {
    if(Validate.formValidate('email', editData.email)) setIsOK(false);
    else setIsOK(true);
  }, [editData])

  useEffect(() => {
    if (props.location.state) {
      setEditData({
        email: props.location.state.email,
      });
    }
  }, [])

  return (
    <HomeLayout headerText="メールアドレスの変更" prevRef={authState.user.is_owner ? RouteName.OWNER_ACCOUNT_TOP : RouteName.EDIT_LOGIN}>
      <div className="mail-form">
        <Input theme={[InputThemes.DISABLED]} label="現在のメールアドレス" placeholder="sample@sample.com" content={authState.user.email} propStyle={{ margin: '16px auto 24px'}} readonly={true} />
        <Input theme={[InputThemes.REQUIRED]} label="新しいメールアドレス" placeholder="sample@sample.com" content={editData.email} handleChange={handleChange} propStyle={{ margin: '16px auto 24px'}} />
        {err && <Text theme={[TextThemes.ERROR]}>{err}</Text>}
        <div className="mail-form_btn-container">
          <Button
            propStyle={{ margin: 'auto' }}
            theme={isOK ? [ButtonThemes.NORMAL] : [ButtonThemes.SUBNORMAL]}
            onClick={isOK ? send : () => {}}>
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

export default EditEmail;