import React from 'react';
// atoms
import Input, { InputThemes } from '../../atoms/Input'
import Button, { ButtonThemes } from '../../atoms/Button'

interface OwnerInfoProps {
  handleChange: any;
  addData: any;
  post: any;
}

const OwnerInfo: React.FC<OwnerInfoProps> = ({ handleChange, addData, post }) => {

  return (
    <div className="container">
      <Input theme={InputThemes.REQUIRED} handleChange={handleChange} label='お名前' placeholder='名前太郎' content={addData.user_name} name='name' />
      <Input theme={InputThemes.REQUIRED} handleChange={handleChange} label='ふりがな' placeholder='なまえたろう' content={addData.user_kana_name} name='kana_name' />
      <Input theme={InputThemes.REQUIRED} handleChange={handleChange} label='メールアドレス' placeholder='sample@sample.com' content={addData.mail} name='mail' />
      <Button theme={[ButtonThemes.NORMAL]} propStyle={{ margin: '24px auto', width: '150px' }} onClick={post}>
        リクエストする
      </Button>
    </div>
  );
}

export default OwnerInfo;