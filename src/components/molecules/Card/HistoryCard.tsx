import React from 'react';
// library
import { Smile, Calendar, ChevronRight } from 'react-feather';
import { Link } from 'react-router-dom';
// common
import CommonStyle from '../../../common/CommonStyle';

interface HistoryCardProps {
  name: string;
  good_count: number;
  bad_count: number;
  browse_date: string;
  nextRef: string;
}

const HistoryCard: React.FC<HistoryCardProps> = ({name, good_count, bad_count, browse_date, nextRef}) => {
  return (
    <li className="history-card">
      <Link to={nextRef} style={{display: 'flex', alignItems: 'center'}}>
        <div className="history-card_content">
          <h2 className="history-card_name">{name}</h2>
          <div className="history-card_info">
            <ul className="history-card_review">
              {/* コメント・評価 削除 */}
              {/* {good_count !== 0 &&
                <li className="history-card_review_option">
                  <span className="history-card_review-icon">
                    <Smile size="20" color="#ED753A" />
                  </span>
                  最高！ {good_count}
                </li>
              } */}
            </ul>
            <div className="history-card_date">
              <span className="history-card_review-icon">
                <Calendar size="14" color="#8C8C8C" />
              </span>
              <p className="history-card_date_text">閲覧日</p>
              <p className="history-card_date_num">{browse_date}</p>
            </div>
          </div>
        </div>
        <button className="history-card_btn"><ChevronRight size="20" color="#333" /></button>
      </Link>
      <style jsx>{`
        //カード
        .history-card{
          background: ${CommonStyle.BgWhite};
          width: 100%;
          padding: 12px 16px;
          box-sizing: border-box;
          margin-bottom: 16px;
        }
        .history-card_content{
          width: calc(100% - 60px);
          margin-right: 16px;
          color: #333;
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
    
    </li>
  );
}

export default HistoryCard;