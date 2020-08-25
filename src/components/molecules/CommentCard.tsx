import React from 'react';
import {CommonStyle} from './../../common/CommonStyle';
import { FormatDate } from '../../common/Function'
import { Calendar } from 'react-feather';
import { AlertTriangle } from 'react-feather';
import Icon, { IconThemes } from './../atoms/Icon';
import Text, { TextThemes } from './../atoms/Text';

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
            <Icon theme={[IconThemes.SMALL]}>
              <Calendar size={14} color="#8C8C8C" />
            </Icon>
            <Text theme={[TextThemes.SMALL]}>来店日</Text>
            <Text theme={[TextThemes.SMALL]}>{FormatDate(new Date(props.comment.date))}</Text>
          </div>
          <div className="card_comment">
            {props.comment.content}
          </div>
          <div className="card_report">
            <Icon theme={[IconThemes.SMALL]}>
              <AlertTriangle size={14} color="#8C8C8C" />
            </Icon>
            <p className="card_report_text">悪質なユーザーを報告</p>
          </div>
        </div>
      </li>
      <style jsx>
        {`
          .card{
            background: ${CommonStyle.BgWhite};
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
            color: ${CommonStyle.TextDarkGary};
            line-height: 19px;
            display:flex;
            align-items: center;
            margin-bottom: 4px;
          }
          .card_date_text{
            color: ${CommonStyle.TextDarkGary};
            margin-right: 8px;
          }
          .card_date_num{
            color: ${CommonStyle.TextDarkGary};
          }
          .card_comment{
            background: ${CommonStyle.BgGray};
            padding: 4px 8px;
            box-sizing: border-box;
            border-radius: 4px;
            width: 100%;
            margin-bottom: 4px;
            line-height: 24px;
          }
          .card_report{
            display: flex;
            color: ${CommonStyle.TextDarkGary};
            font-weight: bold;
            font-size: 12px;
            line-height: 19px;
            margin: 0 0 auto auto;
            width: fit-content;
          }
          .card_report_text{
            display: inline-block;
            color: ${CommonStyle.TextDarkGary}
          }
        `}
      </style>
    </div>

  );
}