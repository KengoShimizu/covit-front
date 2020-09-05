import React from 'react';
// library
import useReactRouter from "use-react-router";
// atoms
import Input, { InputThemes } from '../../atoms/Input';

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
      <Input theme={InputThemes.REQUIRED} handleChange={handleChange} label='お店の名前' placeholder='美味しくて安全なお店' content={addData.shop.name} name='name' />
      <Input theme={isOwnerPage && InputThemes.REQUIRED} handleChange={handleChange} label='ふりがな' placeholder='おいしくてあんぜんなおみせ' content={addData.shop.kana_name} name='kana_name' />
      <Input theme={InputThemes.REQUIRED} handleChange={handleChange} label='住所' placeholder='宮城県仙台市青葉区大町123-14' content={addData.shop.address} name='address' />
      {isOwnerPage && <Input theme={InputThemes.REQUIRED} handleChange={phoneHandleChange} label='電話番号(半角数字のみ)' placeholder='02019228888' content={addData.shop.contact} name='contact' />} 
    </div>
  );
}