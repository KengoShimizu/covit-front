import React from 'react';
// library
import { Smile, Frown } from 'react-feather';
import { Link } from 'react-router-dom';
// common
import CommonStyle from './../../common/CommonStyle';
// components
import Text, { TextThemes } from './../atoms/Text';

interface MapPopupProps {
  steps: {
    id: number;
    content: string;
    image: string;
  }[];
  data: any;
  uniqueImgs: string[];
}
const propStyle = {
  reviewIcon: {
    marginLeft: '8px'
  }
};

const MapPopup: React.FC<MapPopupProps> = (props: any) => {
  return (
    <section className="shop-mordal_container">
      <Link to={`/shops/${props.data.id}`}>
        <div className="shop-card_content">
          <ul className="shop-card_info">
            <li className="shop-card_name">
              <Text theme={[TextThemes.SUBTITLE]}>
                {props.data.name}
              </Text>
            </li>
            <li className="shop-card_review">
              <ul className="shop-card_review-list">
                <li className="shop-card_review-option">
                  <Smile size={24} color="#ED753A" />
                  <Text theme={[TextThemes.SMALL]} propStyle={propStyle.reviewIcon}>
                    {props.data.good_count}
                  </Text>
                </li>
                <li className="shop-card_review-option">
                  <Frown size={24} color="#3A8CED" />
                  <Text theme={[TextThemes.SMALL]} propStyle={propStyle.reviewIcon}>
                    {props.data.bad_count}
                  </Text>
                </li>
              </ul>
            </li>
          </ul>
          <ol className="infection-control_list" >
          {props.uniqueImgs.map((data: any) => (
              <li className="infection-control_option">
                <img className="infection-control_icon" src={data.image} alt="sample" />
              </li>
          ))}
          </ol>
        </div>
        <div　className="shop-card_header-img_wrapper">
          <img className="shop-card_header-img" src={props.data.image} alt="shop" />
        </div>
      </Link>
    <style jsx>{`
        .shop-mordal_container{
          width: 308px;
          height: 205px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          -webkit- transform: translateX(-50%);
          bottom: 44px;
          z-index: 6000;
          border-radius: 24px;
          overflow: hidden;
          background: ${CommonStyle.BgWhite};
          transition: opacity 0.5s, transform 0s 0.5s;
          transition-delay: .5s;
        }
        .shop-card_header-img_wrapper{
          width: 100%;
          height: 98px;
          position: absolute;
          overflow: hidden;
        }
        .shop-card_header-img{
          width: 100%;
          height: auto;
          position: relative;
          top: -24px;
        }
        .shop-card_content{
          top: 98px;
          position: absolute;
          padding: 8px 16px;
        }
        // 店名と評価数のヘッダー
        .shop-card_info{
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .shop-card_review-list{
          display: flex;
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
          justify-content: center;
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