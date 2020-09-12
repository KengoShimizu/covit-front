import React, { useState, useContext, useEffect } from 'react';
// library
import axios from 'axios';
import useReactRouter from "use-react-router";
// components
import HomeLayout from '../../../../templates/HomeLayout';
import Input, { InputThemes } from '../../../../atoms/Input'
import Button, { ButtonThemes } from '../../../../atoms/Button';
import TopModal from '../../../../molecules/Modal/TopModal';
// context
import AuthContext from "../../../../../context/CommonProvider";
import TopModalContext from '../../../../../context/TopModalContext';
// common
import { RouteName, TopModalTime } from '../../../../../common/Const';

interface EditParam {
  name: string;
  kana_name: string;
}

const OwnerEditProfile: React.FC = (props: any) => {
  const { authState } = useContext(AuthContext);
  const { match }: any = useReactRouter();
  const isEdit = match.path.match(/edit/g);
  const [isOK, setIsOK] = useState(!!(authState.user.name && authState.user.kana_name));
  const topModalContext = useContext(TopModalContext);
  const [editData, setEditData] = useState<EditParam>({
    name: authState.user.name,
    kana_name: authState.user.kana_name ? authState.user.kana_name : '',
  });

  const putData = async () => {
    try {
      await axios.put(`/api/v1/owner/users/update`, editData);

      topModalContext.setContents({
        isShown: true,
        text: {
          caption: 'プロフィールを更新しました！'
        }
      });
      props.history.push(RouteName.OWNER_ACCOUNT_TOP);

    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (event: any) => {
    setEditData({
      ...editData,
      [event.target.name]: event.target.value
    });
  }

  useEffect(() => {
    setIsOK(!!(editData.name && editData.kana_name))
  }, [editData]);

  useEffect(() => {
    if (topModalContext.contents.isShown) {
      setTimeout(() => {
        topModalContext.setContents({
          isShown: false,
          text: {
            caption: ''
          }
        })
      }, TopModalTime)
    }
  }, [topModalContext.contents.isShown]);

  return (
    <HomeLayout headerText='担当者情報' prevRef={RouteName.OWNER_ACCOUNT_TOP}>
      <TopModal />
      <div className="content">
        <div className="mail-form">
          <Input theme={[InputThemes.REQUIRED]} label="お名前" placeholder="田中太郎" name="name" content={editData.name} handleChange={handleChange} propStyle={{ marginBottom: '24px'}} />
          <Input theme={[InputThemes.REQUIRED]} label="ふりがな" placeholder="たなかたろう" name="kana_name" content={editData.kana_name} handleChange={handleChange} propStyle={{ marginBottom: '24px'}} />
        </div>
      </div>
      <Button theme={isOK ? [ButtonThemes.NORMAL] : [ButtonThemes.SUBNORMAL]} onClick={isOK ? putData : () => { }} propStyle={{ margin: '16px auto' }}>{isEdit ? '変更する' : '登録する'}</Button>
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

export default OwnerEditProfile;