import React, { useContext } from 'react';
// library
import { Calendar, Trash2 } from 'react-feather';
import { Smile, Frown, Clock, ChevronRight } from 'react-feather';
// common
import CommonStyle from '../../../common/CommonStyle';
import { RedirectFrom } from './../../../common/Const';
import { FormatDate_YM, FormatDate_YMD } from '../../../common/Function';
// components
import Icon, { IconThemes } from '../../atoms/Icon';
import Text, { TextThemes } from '../../atoms/Text';
// context
import RedirectContext from './../../../context/RedirectContext';

const propStyle = {
  headIcon: {
    margin: 'auto 0',
  },
  headText: {
    fontSize: '18px',
    marginLeft: '10px'
  }
}

type CardProps = {
  icon: string
  comment: any;
  isCurrentUser: boolean;
  onClick?: any;
  deletedId?: number;
};

const UserCommentCard: React.FC<CardProps> = ({icon, comment, isCurrentUser, onClick, deletedId}) => {
  const delete_bool = deletedId === comment.id;
  const { setUri } = useContext(RedirectContext);

  const handleClick = () => {
    setUri({
      fromPath: RedirectFrom.USER_COMMENT,
      shop: comment.shop.id,
    });
  }

  return (
    <React.Fragment>
      <li className={`card ${delete_bool && 'delete'}`} onClick={handleClick}>
        <div className="card_content">
            <div className="card_content-head">
              {icon === 'smile' && <Smile size={24} color="#ED753A" style={propStyle.headIcon}/>}
              {icon === 'frown' && <Frown size={24} color="#3A8CED" style={propStyle.headIcon}/>}
              <Text theme={[TextThemes.CAPTION]} propStyle={propStyle.headText}>{comment.shop.name}</Text>
            </div>
            <div className="card_date">
              <Icon theme={[IconThemes.SMALL]}>
                <Calendar size={14} color="#8C8C8C" />
              </Icon>
              <Text theme={[TextThemes.SMALL, TextThemes.DARKGRAY]} propStyle={{margin: '0 6px 0 3px'}}>来店日</Text>
              <Text theme={[TextThemes.SMALL, TextThemes.DARKGRAY]}>{FormatDate_YM(new Date(comment.date))}</Text>
            </div>
            <div className="card_comment">
              <Text theme={[TextThemes.TEXT]}>{comment.content}</Text>
              <div className="card_comment-history">
                <Clock size={14} color={CommonStyle.TextDarkGary} style={{margin: 'auto 6px'}}/>
                <Text theme={[TextThemes.SMALL, TextThemes.DARKGRAY]}>{FormatDate_YMD(new Date(comment.created_at))}</Text>
              </div>
            </div>
          { isCurrentUser &&
            <div className="card_trash" onClick={() => onClick(comment.id)}>
              <Icon theme={[IconThemes.SMALL]}>
                <Trash2 size={14} color="#8C8C8C" />
              </Icon>
              <Text theme={[TextThemes.SMALL, TextThemes.DARKGRAY]}>削除</Text>
            </div>
          }
        </div>
        <div onClick={handleClick} style={{margin: 'auto 10px auto 0'}}>
          <ChevronRight size={24} color="#000"/>
        </div>
      </li>
      <style jsx>
        {`
          .card{
            background: ${CommonStyle.BgWhite};
            max-height: 300px;
            width: 100%;
            display: flex;
            margin-bottom: 16px;
            visibility: visible;
            opacity: 1;
            transition-duration: .5s;
          }
          .card_content{
            width: 100%;
            padding: 15px;
          }
          .card_content-head{
            display: flex;
          }
          .card_date{
            line-height: 19px;
            display:flex;
            align-items: center;
            margin: 5px;
          }
          .history-icon{
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
          .card_comment-history{
            display: flex;
            justify-content: flex-end;
          }
          .card_trash{
            display: flex;
            color: ${CommonStyle.TextDarkGary};
            font-weight: bold;
            font-size: 12px;
            line-height: 19px;
            margin: 0 0 auto auto;
            width: fit-content;
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

export default UserCommentCard;