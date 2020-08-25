import React from 'react';
import {CommonStyle} from './../../common/CommonStyle';
import Alcohol from './../../img/covid-icon_alcohol.svg';
import Mask from './../../img/covid-icon_mask.svg';
import Airing from './../../img/covid-icon_airing.svg';
import Distance from './../../img/covid-icon_distance.svg';
import HealthCare from './../../img/covid-icon_health-care.svg';
import Text, { TextThemes } from './../atoms/Text';
import { ChevronLeft, Smile, DollarSign, ChevronRight, Frown} from 'react-feather';

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

export const MapPopup: React.FC<MapPopupProps> = (props: any) => {
  return (
    <section className="shop-mordal_container">
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
        {props.uniqueImgs.map((data: any) => (
          <ol className="infection-control_list" key={`images${data}`}>
            <li className="infection-control_option">
              <img className="infection-control_icon" src={Alcohol} alt="" />
            </li>
            <li className="infection-control_option">
              <img className="infection-control_icon" src={Airing} alt="" />
            </li>
            <li className="infection-control_option">
              <img className="infection-control_icon" src={Mask} alt="" />
            </li>
            <li className="infection-control_option">
              <img className="infection-control_icon" src={HealthCare} alt="" />
            </li>
            <li className="infection-control_option">
              <img className="infection-control_icon" src={Distance} alt="" />
            </li>
          </ol>
        ))}
      </div>
      <div　className="shop-card_header-img_wrapper">
        <img className="shop-card_header-img" src={props.data.image} alt="shop image" />
      </div>
    <style jsx>{`
        .shop-mordal_container{
          width: 308px;
          height: 205px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          -webkit- transform: translateX(-50%);
          bottom: 20px;
          z-index: 6000;
          border-radius: 24px;
          overflow: hidden;
          background: ${CommonStyle.BgWhite}
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