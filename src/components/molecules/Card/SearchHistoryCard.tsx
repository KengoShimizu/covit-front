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
    <li className="history-card">
      <Link to={nextRef}>
        <div className="history-card_inner-container">
          <div className="history-card_content">
            <Text theme={[TextThemes.CAPTION]} propStyle={{fontSize: '1em'}}>{name}</Text>
            <div className="history-card_info">
              <div className="history-card_date">
                <span className="history-card_review-icon">
                  <Calendar size="16" color="#8C8C8C" style={{marginBottom: '1px'}}/>
                </span>
                <Text theme={[TextThemes.DARKGRAY, TextThemes.SMALL]} propStyle={{marginRight: '4px'}}>閲覧日</Text>
                <Text theme={[TextThemes.DARKGRAY, TextThemes.SMALL]}>{browse_date}</Text>
              </div>
            </div>
          </div>
          <button className="history-card_btn"><ChevronRight size="20" color="#333" /></button>
        </div>
      </Link>
      <style jsx>{`

        .history-card:not(:last-child){
          border-bottom: 2px solid ${CommonStyle.BorderGray};
          margin-bottom: 8px;
        }
        .history-card_inner-container{
          background: ${CommonStyle.BgGray};
          width: 100%;
          padding-bottom: 6px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
        }
        
        .history-card_content{
          display: flex;
          justify-content: space-between;
          width: calc(100% - 44px);
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
      `}</style>
    </li>
  );
}

export default SearchHistoryCard;