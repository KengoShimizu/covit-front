import React from 'react';
import {CommonStyle} from './../../common/CommonStyle';
import { Trash2 } from 'react-feather';
import { Smile } from 'react-feather';
import { Frown } from 'react-feather';
import { Calendar } from 'react-feather';
import { ChevronRight } from 'react-feather';
import { HomeLayout } from '../templates/HomeLayout';

export const History: React.FC = (props: any) => {
    return (
      <HomeLayout subHeaderText='閲覧履歴' prevRef='/' history={props.history}>
        <div className='container'>
          <button className="delete-btn">
            <span className="delete-btn_icon"><Trash2 size="16" color="#8C8C8C" /></span>
            <span className="delete-btn_text">履歴を削除</span>
          </button>
          <ol className="card-list">
            <li className="history-card">
              <div className="history-card_content">
                <h2 className="history-card_name">cafe えにしえ</h2>
                <div className="history-card_info">
                  <ul className="history-card_review">
                    <li className="history-card_review_option">
                      <span className="history-card_review-icon">
                        <Smile size="20" color="#ED753A" />
                      </span>
                      24
                    </li>
                    <li className="history-card_review_option">
                      <span className="history-card_review-icon"><Frown size="20" color="#3A8CED" /></span>
                      2
                    </li>
                  </ul>
                  <div className="history-card_date">
                    <span className="history-card_review-icon">
                      <Calendar size="14" color="#8C8C8C" />
                    </span>
                    <p className="history-card_date_text">閲覧日</p>
                    <p className="history-card_date_num">2020/7/4</p>
                  </div>
                </div>
              </div>
              <button className="history-card_btn"><ChevronRight size="20" color="#333" /></button>
            </li>
          </ol>
        <style jsx>{`
          .container{
            width: 100%;
            min-height: 100vh;
            background-color: ${CommonStyle.BgGray};
            padding-top: 8px;
          }
          // 中身
          .delete-btn{
            margin-right: 24px;
            margin-left: auto;
            display: flex;
            align-items: center;
            background: none;
            margin-bottom: 20px;
          }
          .delete-btn_text{
            color: ${CommonStyle.TextDarkGary};
          }
          .delete-btn_icon{
            width:24px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            fill: ${CommonStyle.TextDarkGary};
          }
          //カード
          .history-card{
            background: ${CommonStyle.BgWhite};
            width: 100%;
            padding: 12px 16px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            margin-bottom: 16px;
          }
          .history-card_content{
            width: calc(100% - 60px);
            margin-right: 16px;
          }
          .history-card_name{
            font-weight: bold;
            font-size: 18px;
            line-height: 24px;
            color: ${CommonStyle.TextBlack};
            margin-bottom: 8px;
          }
          .history-card_info{
            display: flex;
            justify-content: space-between;
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
            margin-right: 12px;
          }
          .history-card_review-icon{
            width: 24px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 4px;
          }
          .history-card_date{
            display: flex;
            align-items: center;
            color: ${CommonStyle.TextDarkGary};
            font-weight: bold;
            font-size: 12px;
          }
          .history-card_date_text{
            color: ${CommonStyle.TextDarkGary};
          }
          .history-card_date_num{
            color: ${CommonStyle.TextDarkGary};
          }
          .history-card_date_icon,.history-card_date_text{
            margin-right: 8px;
          }
          .history-card_btn{
            width: 44px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

        `}</style>
        </div>
      </HomeLayout>
    );

}