import React from 'react';
// library
import { Smile } from 'react-feather';
import { Link } from 'react-router-dom';
// common
import CommonStyle from './../../common/CommonStyle';
// components
import Text, { TextThemes } from './../atoms/Text';
import { CoordType } from '../../common/Const';

interface MapPopupProps {
  data: any;
  uniqueImgs: string[];
}
const propStyle = {
  reviewIcon: {
    marginLeft: '8px'
  },
  shopName: {
    marginRight: '4px',
    maxWidth: '254px',
    lineHeight: '1.1em',
  }
};

const MapPopup: React.FC<MapPopupProps> = ({data, uniqueImgs}) => {
  return (
    <section className="shop-mordal_container">
      <Link to={`/shops/${data?.shop?.id}`}>
        <div className="shop-card_content">
          <ul className="shop-card_info">
            <li className="shop-card_name">
              <Text theme={[TextThemes.SUBTITLE]} propStyle={propStyle.shopName}>
                {data?.shop?.name}
              </Text>
              {data.is_official === CoordType.OFFICIAL ?
                <span className="official-mark">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.86668 1.80005L4.10002 6.56672L1.93335 4.40005" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span> : <React.Fragment />}
            </li>
            <li className="shop-card_review">
              <ul className="shop-card_review-list">
                {/* コメント・評価機能削除 */}
                {/* {data?.shop?.good_count !== 0 &&
                  <li className="shop-card_review-option">
                    <Smile size={24} color="#ED753A" />
                    <Text theme={[TextThemes.SMALL]} propStyle={propStyle.reviewIcon}>
                      最高！ {data?.shop?.good_count}件
                    </Text>
                  </li>
                } */}
                <li className="shop-card_review-option" style={{ position: 'absolute', right: '16px' }}>
                  <span style={{height: '30px'}}><img src={data?.genre?.icon} height="30" width="30"/></span>
                  <Text theme={[TextThemes.SMALL]}>{data?.genre?.name}</Text>
                </li>
              </ul>
            </li>
          </ul>
          <ol className="infection-control_list" >
            {uniqueImgs?.map((data: any, i: number) => (
              <li className="infection-control_option" key={`infection${i}`}>
                <img className="infection-control_icon" src={data?.image} alt="sample" />
              </li>
            ))}
          </ol>
        </div>
        <div className="shop-card_header-img_wrapper">
          <img className="shop-card_header-img" src={data?.shop?.image} alt="shop" />
        </div>
      </Link>
      <style jsx>{`
        .shop-mordal_container{
          width: 308px;
          height: 256px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          -webkit- transform: translateX(-50%);
          bottom: 28px;
          z-index: 6000;
          border-radius: 16px;
          overflow: hidden;
          background: ${CommonStyle.BgWhite};
          transition: opacity 0.5s, transform 0s 0.5s;
          transition-delay: .5s;
        }
        .shop-card_header-img_wrapper{
          width: 100%;
          height: 120px;
          position: absolute;
          overflow: hidden;
        }
        .shop-card_header-img{
          width: 100%;
          height: auto;
          position: relative;
          top: -16px;
        }
        .shop-card_content{
          width: 100%;
          top: 120px;
          position: absolute;
          padding: 8px 16px;
          box-sizing: border-box;
        }
        // 店名と評価数のヘッダー
        .shop-card_info{
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
        }
        .shop-card_name{
          display: flex;
          align-items: center;
          width: 100%;
          margin-bottom: 4px;
        }
        .official-mark{
          background: ${CommonStyle.AccentColor};
          width: 16px;
          height: 16px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .shop-card_review{
          max-width: 100%;
          display: block;
        }
        .shop-card_review-list{
          display: flex;
          height: 30px
        }
        .shop-card_review-option{
          display: flex;
          align-items: center;
        }
        .shop-card_review-option:not(:last-child){
          margin-right: 12px;
        }
        // 感染対策
        .infection-control_list{
          display: flex;
          margin-bottom: 16px;
        }
        .infection-control_option :not(:last-child) {
          margin-right: 8px;
        }
        .infection-control_option{
          width: 48px;
          height: 48px;
          border-radius: 48px;
          background: ${CommonStyle.KeyColor};
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .infection-control_icon{
          width: 26px;
          height: auto;
        }
      `}</style>
    </section>
  );
}

export default MapPopup;