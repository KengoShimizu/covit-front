import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useReactRouter from "use-react-router";
import { HomeLayout } from './../../organisms/HomeLayout';
import Alcohol from './../../../img/covid-icon_alcohol.svg'
import Mask from './../../../img/covid-icon_mask.svg'
import Airing from './../../../img/covid-icon_airing.svg'
import Distance from './../../../img/covid-icon_distance.svg'
import HealthCare from './../../../img/covid-icon_health-care.svg'

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
        <div>
          {shopData.name}<br/>
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
          // 中身
          .content{
            position: relative;
            top: 56px;
            min-height: 100vh;
          }
        `}</style>
      </div>
    </HomeLayout>
  );
}