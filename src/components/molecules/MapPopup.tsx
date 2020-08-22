import React from 'react';
import Alcohol from './../../img/covid-icon_alcohol.svg'
import Mask from './../../img/covid-icon_mask.svg'
import Airing from './../../img/covid-icon_airing.svg'
import Distance from './../../img/covid-icon_distance.svg'
import HealthCare from './../../img/covid-icon_health-care.svg'

interface MapPopupProps {
    steps: {
        id: number;
        content: string;
        image: string;
    }[];
    data: any;
}

export const MapPopup: React.FC<MapPopupProps> = (props: any) => {

    const GetUniqueImgs = () => {
        const images = props.steps.map((data: any) => data.image);
        const uniqueImgs = images.filter(function (x: string, i: number, self: string[]) {
            return self.indexOf(x) === i;
        });
        return uniqueImgs;
    }
    const uniqueImgs = GetUniqueImgs();

    return (
      <div className="container">
        <div className="shop-card">
          <img className="" src={props.data.image} alt="shop image"/>
          <ol className="shop-name-header">
            <li>
              <p className="">{props.data.name}</p>
            </li>
            <li>
              <p>{props.data.good_count}</p>
            </li>
            <li>
              <p>{props.data.bad_count}</p>
            </li>
          </ol>
          {uniqueImgs.map((data: any) => (
            <ol className="infection-control_list" key={`images${data}`}>
              <li className="infection-control_option">
                <img className="infection-control_icon" src={Alcohol} alt=""/>
              </li>
              <li className="infection-control_option">
                <img className="infection-control_icon" src={Airing} alt=""/>
              </li>
              <li className="infection-control_option">
                <img className="infection-control_icon" src={Mask} alt=""/>
              </li>
              <li className="infection-control_option">
                <img className="infection-control_icon" src={HealthCare} alt=""/>
              </li>
              <li className="infection-control_option">
                <img className="infection-control_icon" src={Distance} alt=""/>
              </li>
            </ol>
          ))}
          </div>
          <style jsx>{`
          *{
            margin:0;
            padding:0;
            border:0;
            outline:0;
            list-style:none;
          }
          a{
            text-decoration: none;
          }
          .container{
            width: 100%
          }
          // ポップアップ
          .shop-card{
              z-index: 100;
          }
          // 店名と評価数のヘッダー
          .shop-name-header{
            display: flex;
            justify-content: center;
            margin-bottom: 16px;
          }
          // 感染対策
          .infection-control_list{
            display: flex;
            justify-content: center;
            margin-bottom: 16px;
          }
          .infection-control_option :not(:last-child) {
            margin-right: 12px;
          }
          .infection-control_option{
            width: 60px;
            height: 60px;
            border-radius: 60px;
            background: #98D4F6;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .infection-control_icon{
            width: 34px;
            height: auto;
          }
        `}</style>
        </div>
    );
}