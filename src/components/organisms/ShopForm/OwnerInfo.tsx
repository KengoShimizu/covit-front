import React from 'react';
// atoms
import Input, { InputThemes } from '../../atoms/Input'
import Button, { ButtonThemes } from '../../atoms/Button'

interface OwnerInfoProps {
  handleChange: any;
  addDataOwner: any;
  post: any;
}

const OwnerInfo: React.FC<OwnerInfoProps> = ({ handleChange, addDataOwner, post }) => {

  return (
    <div className="container">
      <Input theme={InputThemes.REQUIRED} handleChange={handleChange} label='お名前' placeholder='名前太郎' content={addDataOwner.name} name='name' />
      <Input theme={InputThemes.REQUIRED} handleChange={handleChange} label='ふりがな' placeholder='なまえたろう' content={addDataOwner.kana_name} name='kana_name' />
      <Button theme={[ButtonThemes.NORMAL]} propStyle={{ margin: '24px auto', width: '150px' }} onClick={post}>
        リクエストする
      </Button>
    </div>
  );
}

export default OwnerInfo;