import React, { useState } from 'react';
// common
import CommonStyle from '../../../common/CommonStyle';
// components
import Text, { TextThemes } from './../../atoms/Text';

interface StationsCardListProps {
  stations: any;
  handleStationClick: any;
}

const StationsCardList: React.FC<StationsCardListProps> = ({ stations, handleStationClick }) => {
  const [selected, setSelected] = useState(0);

  const handleSliderClick = (index: number, data: any, event: any) => {
    setSelected(index);
    handleStationClick(data);
    event.currentTarget.parentNode.scrollLeft = 274 * index - 30;
  }

  return (
    <ul className="stations-card_list" >
      {stations.map((data: any, i: number) =>
        <React.Fragment key={`station-card${i}`}>
          <div style={{minWidth: '24px'}}></div>
          <li className={`station-card ${selected === i && 'selected'}`} onClick={(event) => handleSliderClick(i, data, event)}>
            <img className="station-card_icon" src="station_line.svg" alt="" />
            <div className="station-card_info">
              <Text theme={[TextThemes.CAPTION]} propStyle={{ marginBottom: '8px' }}>
                {data.prefecture}
              </Text>
              <Text theme={[TextThemes.SMALL]} propStyle={{ marginBottom: '4px' }}>
                〒{data.postal.substr(0, 3)}-{data.postal.substr(3, 4)}
              </Text>
              {data.line.length !== 0 &&
                <p className="station-card_line">
                  {data.line}
                </p>
              }
            </div>
          </li>
        </React.Fragment>
      )}
      <div style={{ minWidth: '24px' }}></div>
      <style jsx>{`
        .stations-card_list{
          scroll-behavior: smooth;
          width: 100%;
          display: flex;
          overflow-x: scroll;
          margin: 0;
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
          border: 4px solid ${CommonStyle.BorderGray};
          padding: 12px 16px;
          box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
          border-radius: 16px;
          z-index: 1000;
          list-style: none;
          display: flex;
          align-items: flex-start;
          margin-top: 10px;
          min-width: 200px;
          transition-duration: .2s;
          transition-timing-function: ease;
        }
        .station-card.selected{
          margin-top: 0;
          border: 4px solid ${CommonStyle.BadColor};
          margin-bottom: 10px;
          transition-delay: .1s;
          
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