import React, { useState, useContext } from 'react';
import { HomeLayout } from '../../../../templates/HomeLayout';
import Input, { InputThemes } from '../../../../atoms/Input';
import Button, { ButtonThemes } from '../../../../atoms/Button';

import { AuthContext } from "../../../../../context/CommonProvider";

interface AddParam {
  email: string;
}

export const AddEmail: React.FC = (props: any) => {
  const { authState } = useContext(AuthContext);
  const [addData, setAddData] = useState<AddParam>({
    email: ""
  });

  // FIXME 終了後ページに飛ばす
  const putData = async () => {
    // await axios
    //   .post(`/api/v1/user/users/update`, addData)
    //   .then(result => result.data)
    //   .catch(error => console.log(error));
  }

  const handleChange = (event: any) => {
    setAddData({
      "email": event.target.value
    });
  }

  return (
    <HomeLayout subHeaderText="メールアドレスを登録" prevRef="#" history={props.history}>
      {/* FIXME リンク先 */}
      <Input theme={InputThemes.REQUIRED} label="メールアドレス" placeholder="sample@sample.com" content={addData.email} handleChange={handleChange} propStyle={{margin: '32px auto'}}/>
      <Button theme={[ButtonThemes.NORMAL]} onClick={putData} propStyle={{margin: '16px auto'}}>登録する</Button>
    </HomeLayout>
  );
}