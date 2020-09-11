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
    <div className="stations-card-list">
      <ul className="stations-card-ul">
        {stations.map((data: any, i: number) =>
          <React.Fragment key={`station-card${i}`}>
            <div style={{minWidth: '24px'}}></div>
            <li className="station-card" onClick={() => handleClick(data)}>
              <Text theme={[TextThemes.CAPTION]} propStyle={{ padding: '8px 24px' }}>
                {data.name}駅
              </Text>
              <Text theme={[TextThemes.CAPTION, TextThemes.DARKGRAY]} propStyle={{ padding: '0 24px' }}>
                {`${data.prefecture}　${data.line}`}
              </Text>
            </li>
          </React.Fragment>
        )}
        <div style={{minWidth: '24px'}}></div>
      </ul>
      <style jsx>{`
        .stations-card-list{
          width: 100%;
        }
        .stations-card-ul{
          display: flex;
          overflow-x: scroll;
          margin: 0;	
          padding: 0;
          width: 100%;
          position: absolute;
          bottom: 24px;
          -ms-overflow-style: none; /* IE, Edge 対応 */
          scrollbar-width: none; /* Firefox 対応 */
        }
        .stations-card-ul::-webkit-scrollbar { /* Chrome, Safari 対応 */
            display:none;
        }
        .station-card{
          box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
          border-radius: 16px;
          height: 80px;
          z-index: 1000;
          background-color: ${CommonStyle.BgWhite};
          min-width: 240px;
          list-style: none;
        }
      `}</style>
    </div>
  );
}

export default StationsCardList;