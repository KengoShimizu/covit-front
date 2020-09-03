import React, { useState, useEffect } from 'react';
// atoms
import Input, { InputThemes } from '../../atoms/Input';
import Button, { ButtonThemes } from '../../atoms/Button';
// common
import Validate from '../../../common/Validate';

interface OwnerInfoProps {
  handleChange: any;
  addData: any;
  post: any;
}

const OwnerInfo: React.FC<OwnerInfoProps> = ({ handleChange, addData, post }) => {
  const [isOK, setIsOK] = useState(false);

  useEffect(() => {
    if (Validate.formValidate('owner_info', addData)) setIsOK(false)
    else setIsOK(true)
  }, [addData]);

  return (
    <div className="container">
      <Input theme={InputThemes.REQUIRED} handleChange={handleChange} label='お名前' placeholder='名前太郎' content={addData.owner.name} name='name' />
      <Input theme={InputThemes.REQUIRED} handleChange={handleChange} label='ふりがな' placeholder='なまえたろう' content={addData.owner.kana_name} name='kana_name' />
      <Button theme={isOK ? [ButtonThemes.NORMAL] : [ButtonThemes.SUBNORMAL]} propStyle={{ margin: '24px auto', width: '150px' }} onClick={isOK ? post : () => {}}>
        リクエストする
      </Button>
    </div>
  );
}

export default OwnerInfo;