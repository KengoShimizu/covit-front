import React from 'react';
import { Link } from 'react-router-dom';
import ServiceIcon from './../../img/service-icon.svg';
import Charactor from './../../img/charactor.png';
import { HomeLayout } from '../templates/HomeLayout';
import { MapObject } from '../organisms/MapObject';

import Button, { ButtonThemes } from './../atoms/Button';

// ボタンのCSS
const propStyle = {
  shopMordal: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 auto 40px auto'
  }
};
export const Top: React.FC = () => {
  return (
    <HomeLayout>
      <div className='container'>
        <MapObject/>
        <button className="refinement-btn">お店のジャンルで絞り込む</button>
        <button className="research-btn">このエリアで再検索</button>
        <button className="current-place-btn">現在地</button>
        {/* 初回モーダル */}
        <div className="intro-mordal">
          <h1 className="intro-mordal_title">PAND-MEAL<br/> <span className="intro-mordal_title_jp">へようこそ！</span></h1>
          <img className="intro-mordal_img" src={Charactor} alt=""/>
          <p className="intro-mordal_text">
            PAND-MEALは感染対策に取り組む飲食店と感染対策を求めている人のためのグルメサービスです！
          </p>
          {/* propstyle */}
          <Button theme={[ButtonThemes.NORMAL]} propStyle={propStyle.shopMordal}>
            <img className="intro-mordal_btn_icon" src={ServiceIcon} alt=""/>
            さっそく飲食店を探す
          </Button>
          <Link to=''>
            <p className="intro-mordal_link">PAND-MEALについてもっと知りたい！</p>
          </Link>
          <Link to=''>
            <p className="intro-mordal_link">PAND-MEALにお店を追加したい！</p>
          </Link>
        </div>
        <style jsx>{`
          *{
            margin:0;
            padding:0;
            border:0;
            outline:0;
            list-style:none;
          }
          a{
            text-decoration: none;
          }
          .container{
            width: 100%
          }
          // 初回のモーダル
          .intro-mordal{
            top: 144px;
            left: 50%;
            z-index: 1000;
            transform: translateX(-50%);
            -webkit- transform: translateX(-50%);
            position: fixed;
            background: #FFFFFF;
            border-radius: 8px;
            max-width: 280px;
            width: 80%;
            padding: 36px 16px;
            box-sizing: border-box;
            text-align: center;
          }
          .intro-mordal_title{
            font-family: Century Gothic Pro;
            font-weight: bold;
            font-size: 24px;
            line-height: 24px;
            margin-bottom: 4px;
          }
          .intro-mordal_title_jp{
            font-weight: bold;
            font-size: 18px;
            line-height: 24px;
          }
          .intro-mordal_title_img{
            width: 186px;
            height: auto;
            margin-bottom: 8px;
          }
          .intro-mordal_text{
            font-weight: bold;
            width: 100%;
            font-size: 14px;
            line-height: 24px;
            margin-bottom: 24px;
          }
          .intro-mordal_link{
            color: #8C8C8C;
            text-align: center;
            font-size: 12px;
            line-height: 19px;
          }
          .intro-mordal_btn_icon{
            margin-right: 4px;
          }
          // 中身
          .map-container{
            margin-top: 56px;
            width: 100%;
            height: calc(100vh - 56px);
            background-color: #E8E6E2;
          }
          .refinement-btn{
            position: fixed;
            top: 64px;
            left: 50%;
            transform: translateX(-50%);
            -webkit- transform: translateX(-50%);
            padding: 8px 16px;
            background: #FFFFFF;
            border-radius: 4px;
            color: #333333;
            font-size: 12px;
            line-height: 12px;
            font-weight: bold;
          }
          .research-btn{
            position: fixed;
            bottom: 32px;
            left: 50%;
            transform: translateX(-50%);
            -webkit- transform: translateX(-50%);
            height: 36px;
            padding: 8px 20px;
            background: #FFFFFF;
            border: 1.5px solid #C0C0C0;
            box-sizing: border-box;
            border-radius: 36px;
            color: #333333;
            font-size: 12px;
            line-height: 19px;
            font-weight: bold;
          }
          .current-place-btn{
            position: fixed;
            bottom: 20px;
            right: 24px;
            width: 64px;
            height: 64px;
            background: #FFFFFF;
            border: 4px solid #FF8A1F;
            box-sizing: border-box;
            border-radius: 64px;
          }
          .refinement-btn{
            position: fixed;
            top: 64px;
            left: 50%;
            transform: translateX(-50%);
            -webkit- transform: translateX(-50%);
            padding: 8px 16px;
            background: #FFFFFF;
            border-radius: 4px;
            color: #333333;
            font-size: 12px;
            line-height: 12px;
            font-weight: bold;
            z-index: 1000;
          }
          .research-btn{
            position: fixed;
            bottom: 32px;
            left: 50%;
            transform: translateX(-50%);
            -webkit- transform: translateX(-50%);
            height: 36px;
            padding: 8px 20px;
            background: #FFFFFF;
            border: 1.5px solid #C0C0C0;
            box-sizing: border-box;
            border-radius: 36px;
            color: #333333;
            font-size: 12px;
            line-height: 19px;
            font-weight: bold;
            z-index: 1000;
          }
          .current-place-btn{
            position: fixed;
            bottom: 20px;
            right: 24px;
            width: 64px;
            height: 64px;
            background: #FFFFFF;
            border: 4px solid #FF8A1F;
            box-sizing: border-box;
            border-radius: 64px;
            z-index: 1000;
          }
        `}</style>
      </div>
    </HomeLayout>
  );
}