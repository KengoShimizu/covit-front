import React from 'react';
// library
import { Calendar, ChevronRight } from 'react-feather';
import { Link } from 'react-router-dom';
// component
import Text, { TextThemes } from './../../atoms/Text';
// common
import CommonStyle from '../../../common/CommonStyle';

interface SearchHistoryCardProps {
  name: string;
  browse_date: string;
  nextRef: string;
}

const SearchHistoryCard: React.FC<SearchHistoryCardProps> = ({name, browse_date, nextRef}) => {
  return (
    <Link to={nextRef}>
      <li className="history-card">
        <div className="history-card_content">
          <Text theme={[TextThemes.CAPTION]} propStyle={{fontSize: '1em'}}>{name}</Text>
          <div className="history-card_info">
            <div className="history-card_date">
              <span className="history-card_review-icon">
                <Calendar size="16" color="#8C8C8C" style={{marginBottom: '2px'}}/>
              </span>
              <Text theme={[TextThemes.DARKGRAY, TextThemes.CAPTION]}>閲覧日</Text>
              <Text theme={[TextThemes.DARKGRAY, TextThemes.CAPTION]}>{browse_date}</Text>
            </div>
          </div>
        </div>
        <button className="history-card_btn"><ChevronRight size="20" color="#333" /></button>
      </li>
      <hr className="account-function_hr" />
      <style jsx>{`
        .history-card{
          background: ${CommonStyle.BgGray};
          width: 100%;
          padding: 8px 16px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
        }
        .history-card_content{
          display: flex;
          justify-content: space-between;
          width: calc(100% - 60px);
          margin-right: 16px;
        }
        .history-card_info{
          display: flex;
          justify-content: space-between;
          align-items: center;
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
        .history-card_btn{
          width: 44px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .account-function_hr{
          height: 2px;
          margin: 0;
          background: ${CommonStyle.BgGray}
        }
      `}</style>
    
    </Link>
  );
}

export default SearchHistoryCard;