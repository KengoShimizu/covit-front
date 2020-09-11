import React from 'react';
// library
import useReactRouter from "use-react-router";
// atoms
import Input, { InputThemes } from '../../atoms/Input';
// common
import CommonStyle from '../../../common/CommonStyle';

interface ShopFormProps {
  handleChange: any;
  phoneHandleChange: any;
  addData: any;
}

export const ShopForm: React.FC<ShopFormProps> = ({ handleChange, addData, phoneHandleChange }) => {
  const { match }: any = useReactRouter();
  const isOwnerPage = match.path.match(/owner/g);
  
  return (
    <div className="container">
      <Input 
        theme={[InputThemes.REQUIRED, InputThemes.SHOP_REGISTRATION]}
        handleChange={handleChange}
        label='お店の名前'
        placeholder='美味しくて安全なお店'
        content={addData.shop.name}
        name='name'
        labelColor={{color: CommonStyle.TextBlack}}/>
      <Input
        theme={isOwnerPage ? [InputThemes.REQUIRED, InputThemes.SHOP_REGISTRATION] : [InputThemes.SHOP_REGISTRATION]} handleChange={handleChange}
        label='ふりがな'
        placeholder='おいしくてあんぜんなおみせ'
        content={addData.shop.kana_name}
        name='kana_name'
        labelColor={{color: CommonStyle.TextBlack}}/>
      <Input
        theme={[InputThemes.REQUIRED, InputThemes.SHOP_REGISTRATION]}
        handleChange={handleChange}
        label='住所'
        placeholder='東京都千代田区〇〇'
        content={addData.shop.address}
        name='address' 
        labelColor={{color: CommonStyle.TextBlack}}/>
      {isOwnerPage && <Input 
        theme={[InputThemes.REQUIRED, InputThemes.SHOP_REGISTRATION]}
        handleChange={phoneHandleChange}
        label='電話番号(半角数字のみ)'
        placeholder='000○○○0000'
        content={addData.shop.contact}
        name='contact'
        labelColor={{color: CommonStyle.TextBlack}}/>} 
    </div>
  );
}