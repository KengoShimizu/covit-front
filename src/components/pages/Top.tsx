import React from 'react';
import { Link } from 'react-router-dom';
import HistoryIcon from './../../img/history.svg'
import ServiceIcon from './../../img/service-icon.svg'
import Charactor from './../../img/charactor.png'

import { MapBoard } from '../organisms/MapBoard';

export const Top: React.FC = () => {
  return (
    <div className='container'>
        <header className="header">
          <img className="service-logo" src="" alt=""/>
          <ul className="icon-list">
            <Link to='/History'>
              <li className="icon-list_option">
                <img className="icon-list_img" src={HistoryIcon} alt=""/>
                <p className="icon-list_caption">閲覧履歴</p>
              </li>
            </Link>
            <li className="icon-list_option">
              <img className="icon-list_img" src={HistoryIcon} alt=""/>
              <p className="icon-list_caption">ログイン</p>
            </li>
            <li className="icon-list_option_menu">
              <img className="icon-list_img" src={HistoryIcon} alt=""/>
            </li>
          </ul>
        </header>
        {/* 地図部分 仮でGoogle マップ埋め込んでます*/}
        <MapBoard/>
        {/*<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3132.6500209396736!2d140.8653857507623!3d38.26442229151004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f8a29ffe59c7def%3A0xaa58af3429d7477!2z5a6u5Z-O44K044OB6YWS5aC0IOmKgOe1kOOBs--8iOOCruODs-ODoOOCueODk--8iQ!5e0!3m2!1sja!2sjp!4v1597491700226!5m2!1sja!2sjp" width="600100%" height="100vh" className="map-container"></iframe>*/}
        {/*<button className="refinement-btn">お店のジャンルで絞り込む</button>*/}
        {/*<button className="research-btn">このエリアで再検索</button>*/}
        {/*<button className="current-place-btn">現在地</button>*/}
        {/* 初回モーダル */}
        <div className="intro-mordal">
          <h1 className="intro-mordal_title">PAND-MEAL<br/> <span className="intro-mordal_title_jp">へようこそ！</span></h1>
          <img className="intro-mordal_img" src={Charactor} alt=""/>
          <p className="intro-mordal_text">
            PAND-MEALは感染対策に取り組む飲食店と感染対策を求めている人のためのグルメサービスです！
          </p>
          <button className="intro-mordal_btn">
            <img className="intro-mordal_btn_icon" src={ServiceIcon} alt=""/>
            さっそく飲食店を探す
          </button>
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
        .intro-mordal_btn{
          display: flex;
          margin: 0 auto 40px auto;
          padding: 8px 24px;
          background: #FF8A1F;
          border-radius: 4px;
          color: white;
          font-weight: bold;
          font-size: 14px;
          line-height: 24px;
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

        // ヘッダー
        header{
          height: 56px;
          width: 100%;
          position: fixed;
          background: #FF8A1F;
          display: flex;
          justify-content: space-between;
          padding: 6px 10px;
          box-sizing: border-box;
          
        }
        .icon-list{
          display: flex;
          padding: 0;
        }
        .icon-list_option{
          text-align: center;
          width: 44px;
          height: 44px;
          margin-right: 4px;
        }
        .icon-list_option_menu{
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icon-list_img{
          width: 32px;
          height: 32px;
        }
        .icon-list_caption{
          font-size: 8px;
          line-height: 12px;
          color: white;
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
      `}</style>
    </div>
  );
}