import React from 'react';
// atoms
import Input, { InputThemes } from '../../atoms/Input'

interface ShopFormProps {
  handleChange: any;
  addData: any;
}

export const ShopForm: React.FC<ShopFormProps> = ({ handleChange, addData }) => {

  return (
    <div className="container">
      <Input theme={InputThemes.REQUIRED} handleChange={handleChange} label='お店の名前' placeholder='美味しくて安全なお店' content={addData.name} name='name' />
      <Input theme={InputThemes.REQUIRED} handleChange={handleChange} label='ふりがな' placeholder='おいしくてあんぜんなおみせ' content={addData.kana_name} name='kana_name' />
      <Input theme={InputThemes.REQUIRED} handleChange={handleChange} label='住所' placeholder='宮城県仙台市青葉区大町123-14' content={addData.address} name='address' />
      <Input theme={InputThemes.REQUIRED} handleChange={handleChange} label='電話番号' placeholder='020-0000-0014' content={addData.contact} name='contact' />
    </div>
  );
}