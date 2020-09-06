import React, { useState, useEffect } from 'react';
// common
import CommonStyle from './../../../common/CommonStyle';
// components
import Input, { InputThemes } from '../../atoms/Input';
import Button, { ButtonThemes } from '../../atoms/Button';
import Loading from './../../molecules/Loading';
// common
import Validate from '../../../common/Validate';

interface OwnerInfoProps {
  handleChange: any;
  addData: any;
  post: any;
  load3: boolean;
}

const OwnerInfo: React.FC<OwnerInfoProps> = ({ handleChange, addData, post, load3 }) => {
  const [isOK, setIsOK] = useState(false);

  useEffect(() => {
    if (Validate.formValidate('owner_info', addData)) setIsOK(false)
    else setIsOK(true)
  }, [addData]);

  useEffect(() => {
    setIsOK(false)
  }, [load3])

  return (
    <div className="container">
      {load3 && <Loading/>}
      <Input theme={InputThemes.REQUIRED} handleChange={handleChange} label='お名前' placeholder='名前太郎' content={addData.owner.name} name='name' labelColor={{color: CommonStyle.TextBlack}}/>
      <Input theme={InputThemes.REQUIRED} handleChange={handleChange} label='ふりがな' placeholder='なまえたろう' content={addData.owner.kana_name} name='kana_name' labelColor={{color: CommonStyle.TextBlack}}/>
      <Button theme={isOK ? [ButtonThemes.NORMAL] : [ButtonThemes.SUBNORMAL]} propStyle={{ margin: '24px auto', width: '150px' }} onClick={isOK ? () => post(3) : () => {}}>
        リクエストする
      </Button>
    </div>
  );
}

export default OwnerInfo;