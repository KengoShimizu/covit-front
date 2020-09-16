import React, { useState, useContext, useEffect } from 'react';
// library
import { Edit2 } from 'react-feather';
import axios from 'axios';
import queryString from 'query-string';
// components
import HomeLayout from '../../../../templates/HomeLayout';
import Input, { InputThemes } from '../../../../atoms/Input'
import UserIconSellection from '../../../../organisms/UserIconSellection';
import Button, { ButtonThemes } from '../../../../atoms/Button';
import TopModal from '../../../../molecules/Modal/TopModal';
import Text, { TextThemes } from '../../../../atoms/Text';
import InlineNend from './../../../../common/InlineNend';
// context
import AuthContext from "../../../../../context/CommonProvider";
import TopModalContext from '../../../../../context/TopModalContext';
// common
import { RouteName, TopModalTime } from '../../../../../common/Const';
import Validate from '../../../../../common/Validate';

interface EditParam {
  image: string;
  name: string;
}

const EditProfile: React.FC = (props: any) => {
  const { authState } = useContext(AuthContext);
  const qs = queryString.parse(props.location.search);
  const [isOK, setIsOK] = useState(true);
  const [err, setErr] = useState('');
  const topModalContext = useContext(TopModalContext);
  const [editData, setEditData] = useState<EditParam>({
    image: authState.user.image,
    name: authState.user.name,
  });

  const putData = async () => {
    try {
      await axios.put(`/api/v1/user/users/update`, editData);
      if (qs.state === 'new') {
        topModalContext.setContents({
          isShown: true,
          text: {
            caption: '登録ありがとうございます！',
            small: '引き続きcovEATをお楽しみください。'
          }
        });
        props.history.push(RouteName.ROOT);
      } else {
        topModalContext.setContents({
          isShown: true,
          text: {
            caption: 'プロフィールを更新しました！'
          }
        });
        props.history.push(RouteName.ACCOUNT_TOP);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleNameChange = (event: any) => {
    setEditData({
      ...editData,
      "name": event.target.value
    });
  }

  useEffect(() => {
    if(Validate.formValidate('edit_profile', editData.name)) {
      setIsOK(false);
      if (editData.name.length > 10 ) setErr('ニックネームが長すぎます');
    }
    else {
      setIsOK(true);
      setErr('')
    }
  }, [editData.name]);

  useEffect(() => {
    if (qs.state === 'new') {
      topModalContext.setContents({
        isShown: true,
        text: {
          caption: '登録が完了いたしました！',
          small: '簡単なプロフィールの入力をお願いします。'
        }
      });
    }
  }, [])

  useEffect(() => {
    if (topModalContext.contents.isShown){
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
    <HomeLayout headerText={'プロフィールの編集'} prevRef={RouteName.ACCOUNT_TOP} noBtn={qs.state === 'new' ? true : false}>
      <TopModal/>
      <Input 
        theme={[InputThemes.EDIT_PROFILE]}
        IconTheme={InputThemes.ICON_RIGHT}
        label="ニックネーム"
        placeholder="おなまえ"
        content={editData.name}
        icon={<Edit2 color="black" />}
        handleChange={handleNameChange}
        propStyle={{margin: '32px auto 24px', padding: '1rem 1rem 0'}}
      />
      {err && <Text theme={[TextThemes.ERROR, TextThemes.CAPTION]} propStyle={{textAlign: 'center'}}>{err}</Text>}
      <UserIconSellection data={editData} setData={setEditData} />
      <Button theme={isOK ? [ButtonThemes.NORMAL] : [ButtonThemes.SUBNORMAL]} onClick={isOK ? putData : () => {}} propStyle={{margin: '16px auto'}}>登録する</Button>
      <InlineNend media={65737} site={342425} spot={1014053} type={1} oriented={1} id={'EditProfile'} height={300} width={300}/>
    </HomeLayout>
  );
}

export default EditProfile;