import React from 'react';
// library
import { Calendar, AlertTriangle } from 'react-feather';
import { Link } from 'react-router-dom';
// common
import CommonStyle from '../../../common/CommonStyle';
import { FormatDate_YM } from '../../../common/Function';
// components
import Icon, { IconThemes } from '../../atoms/Icon';
import Text, { TextThemes } from '../../atoms/Text';

type CardProps = {
  comment: any;
  onClick?: any;
};

const ShopCommentCard: React.FC<CardProps> = ({comment, onClick}) => {

  return (
    <div>
      <li className="card">
        <Link to={`/users/${comment.user.id}/comments`}>
          <Icon theme={[IconThemes.LIST]} propStyle={{margin: '6px 6px 0 0'}}>
            <img className="card_icon" src={comment.user.image} alt="" />
          </Icon>
        </Link>
        <div className="card_content">
          <Link to={`/users/${comment.user.id}/comments`}>
            <Text theme={[TextThemes.CAPTION]}>{comment.user.name}</Text>
            <div className="card_date">
              <Icon theme={[IconThemes.SMALL]}>
                <Calendar size={14} color="#8C8C8C" />
              </Icon>
              <Text theme={[TextThemes.SMALL, TextThemes.DARKGRAY]} propStyle={{margin: '0 6px 0 3px'}}>来店日</Text>
              <Text theme={[TextThemes.SMALL, TextThemes.DARKGRAY]}>{FormatDate_YM(new Date(comment.date))}</Text>
            </div>
            <div className="card_comment">
              <Text theme={[TextThemes.TEXT]}>{comment.content}</Text>
            </div>
          </Link>
          <div className="card_report">
            <Icon theme={[IconThemes.SMALL]}>
              <AlertTriangle size={14} color="#8C8C8C" />
            </Icon>
            <div onClick={onClick}>
              <Text theme={[TextThemes.SMALL, TextThemes.DARKGRAY]}>悪質なユーザーを報告</Text>
            </div>
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
          .card_icon{
            width: 100%;
            height: auto;
          }
          .card_content{
            width: calc(100% - 42px);
          }
          .card_date{
            line-height: 19px;
            display:flex;
            align-items: center;
            margin-bottom: 4px;
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
        `}
      </style>
    </div>

  );
}

export default ShopCommentCard;