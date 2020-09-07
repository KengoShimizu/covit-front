import React from 'react';
// common
import CommonStyle from './../../../common/CommonStyle';
// atoms
import Input, { InputThemes } from '../../atoms/Input';

interface ShopLinkFormProps {
  handleLinkChange: any;
  links: any;
}

export const ShopLinkForm: React.FC<ShopLinkFormProps> = ({ handleLinkChange, links }) => {

  return (
    <div className="container">
      <Input theme={InputThemes.INIT} handleChange={handleLinkChange} label='ホームページのリンク' placeholder='https://www.sample.com/' content={links.homepage.url} name='homepage' labelColor={{color: CommonStyle.TextBlack}}/>
      <Input theme={InputThemes.INIT} handleChange={handleLinkChange} label='Instagramのリンク' placeholder='https://www.sample.com/' content={links.instagram.url} name='instagram' labelColor={{color: CommonStyle.TextBlack}}/>
      <Input theme={InputThemes.INIT} handleChange={handleLinkChange} label='Twitterのリンク' placeholder='https://www.sample.com/' content={links.twitter.url} name='twitter' labelColor={{color: CommonStyle.TextBlack}}/>
      <Input theme={InputThemes.INIT} handleChange={handleLinkChange} label='Facebookのリンク' placeholder='https://www.sample.com/' content={links.facebook.url} name='facebook' labelColor={{color: CommonStyle.TextBlack}}/>
    </div>
  );
}