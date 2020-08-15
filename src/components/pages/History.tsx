import React from 'react';
import { Link } from 'react-router-dom';
import HistoryIcon from './../../img/history.svg'

export const History: React.FC = () => {
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
              <Link to='/Top'>
                <div className="sub-header_btn">
                  <p>←</p>
                </div>
              </Link>
              <h1 className="sub-header_title">閲覧履歴</h1>
            </div>
            <button className="delete-btn">
              <img className="delete-btn_icon" src={HistoryIcon} alt=""/>
              履歴を削除
            </button>
            <ol className="card-list">
              <li className="history-card">
                <div className="history-card_content">
                  <h2 className="history-card_name">cafe えにしえ</h2>
                  <div className="history-card_info">
                    <ul className="history-card_review">
                      <li className="history-card_review_option">
                        <img className="history-card_review_icon" src={HistoryIcon} alt=""/>
                        24
                      </li>
                      <li className="history-card_review_option">
                        <img className="history-card_review_icon" src={HistoryIcon} alt=""/>
                        2
                      </li>
                    </ul>
                    <div className="history-card_date">
                      <img className="history-card_date_icon" src={HistoryIcon} alt=""/>
                      <p className="history-card_date_text">閲覧日</p>
                      <p className="history-card_date_num">2020/7/4</p>
                    </div>
                  </div>
                </div>
                <img className="history-card_btn" src="" alt=""/>
              </li>
              <li className="history-card">
                <div className="history-card_content">
                  <h2 className="history-card_name">cafe えにしえ</h2>
                  <div className="history-card_info">
                    <ul className="history-card_review">
                      <li className="history-card_review_option">
                        <img className="history-card_review_icon" src={HistoryIcon} alt=""/>
                        24
                      </li>
                      <li className="history-card_review_option">
                        <img className="history-card_review_icon" src={HistoryIcon} alt=""/>
                        2
                      </li>
                    </ul>
                    <div className="history-card_date">
                    <img className="history-card_date_icon" src={HistoryIcon} alt=""/>
                    <p className="history-card_date_text">閲覧日</p>
                    <p className="history-card_date_num">2020/7/4</p>
                  </div>
                  </div>
                </div>
                <img className="history-card_btn" src="" alt=""/>
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
            background-color: #E7E7E7;
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
          .delete-btn{
            margin-right: 24px;
            margin-left: auto;
            display: flex;
            align-items: center;
            color: #8C8C8C;
            background: none;
            margin-bottom: 20px;
          }
          .delete-btn_icon{
            margin-right: 4px;
            fill: #8C8C8C;
          }
          //カード
          .history-card{
            background: #FFFFFF;
            width: 100%;
            padding: 12px 16px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            margin-bottom: 16px;
          }
          .history-card_name{
            font-weight: bold;
            font-size: 18px;
            line-height: 24px;
            color: #333333;
            margin-bottom: 8px;
          }
          .history-card_info{
            display: flex;
            align-items: center;
          }
          .history-card_review{
            display: flex;
            align-items: center;
            font-weight: bold;
            font-size: 12px;
          }
          .history-card_review_option{
            display: flex;
            align-items: center;
          }
          .history-card_review_icon{
            margin-right: 4px;
          }
          .history-card_date{
            display: flex;
            align-items: center;
            color: #8C8C8C;
            font-weight: bold;
            font-size: 12px;
          }
          .history-card_date_icon,.history-card_date_text{
            margin-right: 8px;
          }
        `}</style>
        </div>
        
    );

}