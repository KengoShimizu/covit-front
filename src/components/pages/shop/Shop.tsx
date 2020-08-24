import React, { useState, useEffect } from 'react';
import {CommonStyle} from './../../../common/CommonStyle';
import axios from 'axios';
import useReactRouter from "use-react-router";
import { HomeLayout } from '../../templates/HomeLayout';
import Alcohol from './../../../img/covid-icon_alcohol.svg';
import Mask from './../../../img/covid-icon_mask.svg';
import Airing from './../../../img/covid-icon_airing.svg';
import Distance from './../../../img/covid-icon_distance.svg';
import HealthCare from './../../../img/covid-icon_health-care.svg';
import Icon, { IconThemes } from './../../atoms/Icon';
import Title, { TitleThemes } from './../../atoms/Title';
import Button, { ButtonThemes } from './../../atoms/Button';

import { Menu } from 'react-feather';

export const Shop: React.FC = () => {
  const { match }: any = useReactRouter();
  const [err, setErr] = useState("");
  const [shopData, setShopData] = useState({
    user_id: 0,
    name: '',
    address: '',
    contact: '',
    good_count: 0,
    bad_count: 0,
    image: '',
    business_date: '',
    price_day: 0,
    price_night: 0,
    other_step: '',
  });
  const [stepData, setStepData] = useState([]);
  
  const fetchShopData = async () => {
    await axios.get(`/api/v1/user/shops/${match.params.id}`)
    .then(res => setShopData(res.data))
    .catch(err => setErr(err));
  }

  const fetchStepsData = async () => {
    await axios.get(`/api/v1/user/steps?shop_id=${match.params.id}`)
    .then(res => setStepData(res.data))
    .catch(err => setErr(err));
  }

  const GetUniqueImgs = () => {
    const images = stepData.map((data: any) => data.image);
    const uniqueImgs = images.filter(function (x: string, i: number, self: string[]) {
      return self.indexOf(x) === i;
    });
    return uniqueImgs;
  }
  const uniqueImgs = GetUniqueImgs();

  useEffect(() => {
    fetchShopData();
    fetchStepsData();
  }, [])

  return (
    <HomeLayout>
      <div className="content">
        <div className="shop-card">
          <div className="sub-header">
            <Button theme={[ButtonThemes.SUBHEADER]}>
              <Menu size={24} color="#333" />
            </Button>
            <Title theme={[TitleThemes.SUBHEADER]}>
              {shopData.name}
            </Title>
          </div>
          
          <img className="" src={shopData.image} alt="shop header"/><br/>
          {shopData.good_count}<br/>
          {shopData.bad_count}<br/>
          {shopData.price_day}<br/>
          {shopData.price_night}<br/>
          {shopData.business_date}<br/>
          {shopData.contact}<br/>
          {shopData.address}<br/>

          {uniqueImgs.map((data: any) => (
            <ol className="infection-control_list" key={`images${data}`}>
              <li className="infection-control_option">
                <Icon theme={[IconThemes.COVIDMEASURE]}>
                  <img className="infection-control_icon" src={Alcohol} alt=""/>
                </Icon>
              </li>
              <li className="infection-control_option">
                <Icon theme={[IconThemes.COVIDMEASURE]}>
                  <img className="infection-control_icon" src={Airing} alt=""/>
                </Icon>
              </li>
              <li className="infection-control_option">
                <Icon theme={[IconThemes.COVIDMEASURE]}>
                  <img className="infection-control_icon" src={Mask} alt=""/>
                </Icon>
              </li>
              <li className="infection-control_option">
                <Icon theme={[IconThemes.COVIDMEASURE]}>
                  <img className="infection-control_icon" src={HealthCare} alt=""/>
                </Icon>
              </li>
              <li className="infection-control_option">
                <Icon theme={[IconThemes.COVIDMEASURE]}>
                  <img className="infection-control_icon" src={Distance} alt=""/>
                </Icon>
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
          .sub-header{
            background: ${CommonStyle.BgWhite};
            width: 100%;
            height: 40px;
            text-align: center;
            margin-bottom: 8px;
          }
          // 中身
          .content{
            position: relative;
            top: 56px;
            min-height: 100vh;
          }
          .infection-control_list{
            display: flex;
          }
          .infection-control_option:not(:last-child) {
            margin-right: 8px;
          }
          .infection-control_icon{
            width: 32px;
            height: auto;
          }
        `}</style>
      </div>
    </HomeLayout>
  );
}