import React from 'react';
import { FormatDate } from './../util/Function'

type CardProps = {
  HistoryIcon: any;
  comment: any;
};

export const CommentCard: React.FC<CardProps> = (props: CardProps) => {

  return (
    <div>
      <li className="card">
        <div className="card_icon_wrapper">
          <img className="card_icon" src="" alt="" />
        </div>
        <div className="card_content">
          <div className="card_name">{props.comment.user.name}</div>
          <div className="card_date">
            <img className="card_date_icon" src={props.HistoryIcon} alt="" />
            <p className="card_date_text">来店日</p>
            <p className="card_date_num">{FormatDate(new Date(props.comment.date))}</p>
          </div>
          <div className="card_comment">
            {props.comment.content}
          </div>
          <div className="card_report">
            <img src="" alt="" />
            <p className="card_report_text">悪質なユーザーを報告</p>
          </div>
        </div>
      </li>
      <style jsx>
        {`
          .card{
            background: #FFFFFF;
            width: 100%;
            display: flex;
            margin-bottom: 16px;
          }
          .card_content{
            width: calc(100% - 42px);
          }
          .card_icon_wrapper{
            width: 34px;
            height: 34px;
            border-radius: 34px;
            background: blue;
            margin-right: 8px;
          }
          .card_name{
            font-weight: bold;
            font-size: 14px;
            line-height: 24px;
          }
          .card_date{
            color: #8C8C8C;
            font-weight: bold;
            font-size: 12px;
            line-height: 19px;
            display:flex;
            align-items: center;
            margin-bottom: 4px;
          }
          .card_date_icon{
            width: 14px;
            height: 14px;
          }
          .card_comment{
            background: #E7E7E7;
            padding: 4px 8px;
            box-sizing: border-box;
            border-radius: 4px;
            width: 100%;
            margin-bottom: 4px;
          }
          .card_report{
            display: flex;
            color: #8C8C8C;
            font-weight: bold;
            font-size: 12px;
            line-height: 19px;
            margin: 0 0 auto auto;
            width: fit-content;
          }
          .card_report_text{
            display: inline-block;
          }
        `}
      </style>
    </div>

  );
}