import React, { useContext } from 'react';
// library
import { Calendar, AlertTriangle, Trash2 } from 'react-feather';
import { Link } from 'react-router-dom';
// common
import CommonStyle from '../../../common/CommonStyle';
import { FormatDate_YM } from '../../../common/Function';
// components
import Icon, { IconThemes } from '../../atoms/Icon';
import Text, { TextThemes } from '../../atoms/Text';
// context
import AuthContext from "../../../context/CommonProvider";

type CardProps = {
  comment: any;
  clickReport: any;
  clickDelete: any;
  deletedId: number;
};

const ShopCommentCard: React.FC<CardProps> = ({ comment, clickReport, clickDelete, deletedId }) => {
  const { authState } = useContext(AuthContext);
  const bool = authState.user.id === comment.user.id;
  const delete_bool = deletedId === comment.id;
  return (
    <React.Fragment>
      <li className={`card ${delete_bool && 'delete'}`}>
        <Link to={`/users/${comment.user.id}/comments`}>
          <Icon theme={[IconThemes.LIST]} propStyle={{ margin: '6px 6px 0 0' }}>
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
              <Text theme={[TextThemes.SMALL, TextThemes.DARKGRAY]} propStyle={{ margin: '0 6px 0 3px' }}>来店日</Text>
              <Text theme={[TextThemes.SMALL, TextThemes.DARKGRAY]}>{FormatDate_YM(new Date(comment.date))}</Text>
            </div>
            <div className="card_comment">
              <Text theme={[TextThemes.TEXT]}>{comment.content}</Text>
            </div>
          </Link>
          <div className="card_report">
            <Icon theme={[IconThemes.SMALL]}>
              {bool ? 
                <Trash2 size={14} color={CommonStyle.AccentColor} />
                :
                <AlertTriangle size={14} color="#8C8C8C" />
              }
            </Icon>
            <div onClick={bool ? () => clickDelete(comment.id) : () => clickReport(comment.user.id, comment.user.name)}>
              <Text theme={bool ? [TextThemes.SMALL] : [TextThemes.SMALL, TextThemes.DARKGRAY]} propStyle={bool ? {color: CommonStyle.AccentColor} : {}}>
                {bool ? '削除' : '悪質なユーザーを報告'}
              </Text>
            </div>
          </div>
        </div>
      </li>
      <style jsx>
        {`
          .card{
            background: ${CommonStyle.BgWhite};
            width: 100%;
            max-height: 300px;
            display: flex;
            margin-bottom: 16px;
            visibility: visible;
            opacity: 1;
            transition-duration: .5s;
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
            cursor: pointer;
          }
          .delete{
            max-height: 0;
            opacity: 0;
          }
        `}
      </style>
    </React.Fragment>

  );
}

export default ShopCommentCard;