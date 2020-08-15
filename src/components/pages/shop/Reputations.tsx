import React from 'react';
import { Link } from 'react-router-dom';
import HistoryIcon from './../../../img/history.svg'

// ショップのコメント一覧
export const Reputations: React.FC = () => {
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
      <div className="content">
      <div className="sub-header">
        <Link to='/'>
          <div className="sub-header_btn">
            <p>←</p>
          </div>
        </Link>
        <h1 className="sub-header_title">コメント一覧</h1>
      </div>
      <div className="review-switch_container">
        <div className="review-switch" style={{borderBottom:"solid", borderBottomColor:"#ED753A", borderBottomWidth:"4px"}}>
          <img className="review-switch_img" src={HistoryIcon} alt=""/>
          <p className="review-switch_num" style={{color:"#ED753A"}}>24</p>
        </div>
        <div className="review-switch" style={{borderBottom:"solid", borderBottomColor:"#3A8CED", borderBottomWidth:"4px"}}>
          <img className="review-switch_img" src={HistoryIcon} alt=""/>
          <p className="review-switch_num" style={{color:"#3A8CED"}}>24</p>
        </div>
        {/* 選択中じゃない時は#B6B2AA */}
      </div>
      <ol className="review-list">
        <li className="review-card">
          <div className="review-card_icon_wrapper">
            <img className="review-card_icon" src="" alt=""/>
          </div>
          <div className="review-card_content">
            <div className="review-card_name">お名前</div>
            <div className="review-card_date">
              <img className="review-card_date_icon" src={HistoryIcon} alt=""/>
              <p className="review-card_date_text">来店日</p>
              <p className="review-card_date_num">2020/7/4</p>
            </div>
            <div className="review-card_comment">
              良かったです。
            </div>
            <div className="review-card_report">
              <img src="" alt=""/>
              <p className="review-card_report_text">悪質なユーザーを報告</p>
            </div>
          </div>
        </li>
        <li className="review-card">
          <div className="review-card_icon_wrapper">
            <img className="review-card_icon" src="" alt=""/>
          </div>
          <div className="review-card_content">
            <div className="review-card_name">お名前</div>
            <div className="review-card_date">
              <img className="review-card_date_icon" src={HistoryIcon} alt=""/>
              <p className="review-card_date_text">来店日</p>
              <p className="review-card_date_num">2020/7/4</p>
            </div>
            <div className="review-card_comment">
              良かったです。
            </div>
            <div className="review-card_report">
              <img src="" alt=""/>
              <p className="review-card_report_text">悪質なユーザーを報告</p>
            </div>
          </div>
        </li>
        </ol>
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
          z-index: 100;
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
        .content{
          position: relative;
          top: 56px;
          min-height: 100vh;
        }
        .sub-header{
          background: #FFFFFF;
          width: 100%;
          height: 40px;
          text-align: center;
          margin-bottom: 8px;
        }
        .sub-header_btn{
          width: 40px;
          height: 40px;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sub-header_title{
          display: inline-block;
          font-weight: bold;
          font-size: 14px;
          line-height: 24px;
          color: #333333;
          margin: 9px auto 7px auto;
        }
        
        .review-switch_container{
          width: 100%;
          display: flex;
        }
        .review-switch{
          width: 50%;
          display: flex;
          justify-content: center;
        }
        .review-switch_img{
          width: 24px;
          margin-right: 4px;
          height: auto;
        }
        .review-switch_num{
          font-weight: bold;
          font-size: 12px;
          line-height: 19px;
        }
        //カード
        .review-list{
          padding: 24px 20px;
        }
        .review-card{
          background: #FFFFFF;
          width: 100%;
          display: flex;
          margin-bottom: 16px;
        }
        .review-card_content{
          width: calc(100% - 42px);
        }
        .review-card_icon_wrapper{
          width: 34px;
          height: 34px;
          border-radius: 34px;
          background: blue;
          margin-right: 8px;
        }
        .review-card_name{
          font-weight: bold;
          font-size: 14px;
          line-height: 24px;
        }
        .review-card_date{
          color: #8C8C8C;
          font-weight: bold;
          font-size: 12px;
          line-height: 19px;
          display:flex;
          align-items: center;
          margin-bottom: 4px;
        }
        .review-card_date_icon{
          width: 14px;
          height: 14px;
        }
        .review-card_comment{
          background: #E7E7E7;
          padding: 4px 8px;
          box-sizing: border-box;
          border-radius: 4px;
          width: 100%;
          margin-bottom: 4px;
        }
        .review-card_report{
          display: flex;
          color: #8C8C8C;
          font-weight: bold;
          font-size: 12px;
          line-height: 19px;
          margin: 0 0 auto auto;
          width: fit-content;
        }
        .review-card_report_text{
          display: inline-block;
        }
      `}</style>
    </div>
  );
}