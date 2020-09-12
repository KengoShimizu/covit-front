import React, { useState, useContext } from 'react';
// library
// common
import CommonStyle from '../../../common/CommonStyle';
// components
import Text, { TextThemes } from './../../atoms/Text';


interface StationsCardListProps {
  stations: any;
  handleStationClick: any;
}

const StationsCardList: React.FC<StationsCardListProps> = ({ stations, handleStationClick }) => {

  const handleClick = (data: any) => {
    handleStationClick(data);
  }

  return (
    <ul className="stations-card_list">
      {stations.map((data: any, i: number) =>
        <React.Fragment key={`station-card${i}`}>
          <li className="station-card" onClick={() => handleClick(data)}>
            <img className="station-card_icon" src="station_line.svg" alt=""/>
            <div className="station-card_info">
              {/* FIXMEデータの綺麗な取り出し方わからん */}
              <Text theme={[TextThemes.CAPTION]} propStyle={{ marginBottom: '8px'}}>
                東京都
                {/* {data.name}駅 */}
              </Text>
              <Text theme={[TextThemes.SMALL]} propStyle={{ marginBottom: '4px' }}>
                〒107-0052
                {/* {`${data.prefecture}　${data.line}`} */}
              </Text>
              <p className="station-card_line">
                東京メトロ千代田線
                {/* {`${data.prefecture}　${data.line}`} */}
              </p>
            </div>
          </li>
        </React.Fragment>
      )}
      <div style={{minWidth: '24px'}}></div>
      <style jsx>{`
        .stations-card_list{
          width: 100%;
          display: flex;
          overflow-x: scroll;
          margin: 0;	
          padding: 0 0 0 24px;
          width: 100%;
          position: absolute;
          bottom: 24px;
          -ms-overflow-style: none; /* IE, Edge 対応 */
          scrollbar-width: none; /* Firefox 対応 */
        }
        .stations-card_list::-webkit-scrollbar { /* Chrome, Safari 対応 */
          display:none;
        }
        .station-card{
          background: ${CommonStyle.BgWhite};
          border: 4px solid ${CommonStyle.BadColor};
          padding: 12px 16px;
          box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
          border-radius: 16px;
          z-index: 1000;
          list-style: none;
          display: flex;
          align-items: flex-start;
          margin-right: 12px;
        }
        .station-card_icon{
          margin-right: 16px;
        }
        .station-card_line{
          padding: 2px 4px;
          font-size: 12px;
          white-space: nowrap;
          font-weight: bold;
          background: ${CommonStyle.BgGray};
          color: ${CommonStyle.TextBlack};
          border-radius: 2px;
        }
      `}</style>
    </ul>
  );
}

export default StationsCardList;