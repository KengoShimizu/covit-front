import React, { useState, useContext } from 'react';
// library
import { Edit2 } from 'react-feather';
import axios from 'axios';
// components
import HomeLayout from '../../../../templates/HomeLayout';
import Input, { InputThemes } from '../../../../atoms/Input'
import UserIconSellection from '../../../../organisms/UserIconSellection';
import Button, { ButtonThemes } from '../../../../atoms/Button';
// context
import AuthContext from "../../../../../context/CommonProvider";
// common
import { RouteName } from '../../../../../common/Const';

interface EditParam {
  image: string;
  name: string;
}

export const EditProfile: React.FC = (props: any) => {
  const { authState } = useContext(AuthContext);
  const [editData, setEditData] = useState<EditParam>({
    image: authState.user.image,
    name: authState.user.name,
  });
  // FIXME 終了後ページに飛ばす
  const putData = async () => {
    await axios
      .put(`/api/v1/user/users/update`, editData)
      .then(result => result.data)
      .catch(error => console.log(error));
  }

  const handleNameChange = (event: any) => {
    setEditData({
      ...editData,
      "name": event.target.value
    });
  }

  return (
    <HomeLayout headerText={'プロフィールの編集'} prevRef={RouteName.ACCOUNT_TOP} history={props.history}>
      <Input theme={InputThemes.EDIT_PROFILE} label="ニックネーム" placeholder="おなまえ" content={editData.name} icon={<Edit2 color="black" />} handleChange={handleNameChange} propStyle={{margin: '32px auto', padding: '1rem'}}/>
      <UserIconSellection data={editData} setData={setEditData} />
      <Button theme={[ButtonThemes.NORMAL]} onClick={putData} propStyle={{margin: '16px auto'}}>登録する</Button>
    </HomeLayout>
  );
}