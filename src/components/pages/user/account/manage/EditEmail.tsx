import React, { useState, useContext } from 'react';
import { HomeLayout } from '../../../../templates/HomeLayout';
import Input, { InputThemes } from '../../../../atoms/Input'
import Button, { ButtonThemes } from '../../../../atoms/Button'
import { AuthContext } from "../../../../../context/CommonProvider";

interface EditParam {
  email: string;
}

export const EditEmail: React.FC = (props: any) => {
  const { authState } = useContext(AuthContext);
  const [editData, setEditData] = useState<EditParam>({
    email: ""
  });

  // FIXME 終了後ページに飛ばす
  const putData = async () => {
    // await axios
    //   .put(`/api/v1/user/users/update`, editData)
    //   .then(result => result.data)
    //   .catch(error => console.log(error));
  }

  const handleChange = (event: any) => {
    setEditData({
      "email": event.target.value
    });
  }

  return (
    <HomeLayout subHeaderText="メールアドレスの編集" prevRef="#" history={props.history}>
      {/* FIXME リンク先 */}
      <Input theme={InputThemes.DISABLED} label="現在のメールアドレス" placeholder="sample@sample.com" content={authState.user.email} propStyle={{margin: '32px auto'}} readonly={true}/>
      <Input theme={InputThemes.REQUIRED} label="新しいメールアドレス" placeholder="sample@sample.com" content={editData.email} handleChange={handleChange} propStyle={{margin: '32px auto'}}/>
      <Button theme={[ButtonThemes.NORMAL]} onClick={putData} propStyle={{margin: '16px auto'}}>登録する</Button>
    </HomeLayout>
  );
}