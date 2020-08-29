import React from 'react';
// atoms
import Input, { InputThemes } from '../../atoms/Input'

interface ShopLinkFormProps {
  handleLinkChange: any;
  links: any;
}

export const ShopLinkForm: React.FC<ShopLinkFormProps> = ({ handleLinkChange, links }) => {

  return (
    <div className="container">
      <Input theme={InputThemes.INIT} handleChange={handleLinkChange} label='ホームページのリンク' placeholder='https://www.sample.com/' content={links.homepage.url} name='homepage' />
      <Input theme={InputThemes.INIT} handleChange={handleLinkChange} label='Instagramのリンク' placeholder='https://www.sample.com/' content={links.instagram.url} name='instagram' />
      <Input theme={InputThemes.INIT} handleChange={handleLinkChange} label='Twitterのリンク' placeholder='https://www.sample.com/' content={links.twitter.url} name='twitter' />
      <Input theme={InputThemes.INIT} handleChange={handleLinkChange} label='Facebookのリンク' placeholder='https://www.sample.com/' content={links.facebook.url} name='facebook' />
    </div>
  );
}