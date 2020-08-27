import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {CommonStyle} from '../../../../common/CommonStyle';
import axios from 'axios';
import useReactRouter from "use-react-router";
import { HomeLayout } from '../../../templates/HomeLayout';
import Alcohol from './../../../../img/covid-icon_alcohol.svg';
import Mask from './../../../../img/covid-icon_mask.svg';
import Airing from './../../../../img/covid-icon_airing.svg';
import Distance from './../../../../img/covid-icon_distance.svg';
import HealthCare from './../../../../img/covid-icon_health-care.svg';
import Icon, { IconThemes } from '../../../atoms/Icon';
import Text, { TextThemes } from '../../../atoms/Text';
import Button, { ButtonThemes } from '../../../atoms/Button';
import { Smile, ChevronRight, Frown, Edit, Clock, Phone, MapPin, Twitter, Monitor, Facebook, Instagram, Sun, Moon} from 'react-feather';


const propStyle = {
  commentLink: {
    // marginRight: '0',
    // marginLeft: 'auto',
  },
  commentBtn: {
    margin: '0 auto 0 auto'
  },
  shopedit: {
    margin: '0 auto 0 auto',
  }
};

export const Shop: React.FC = (props: any) => {
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
  
  const fetchShopData = () => {
    axios.get(`/api/v1/user/shops/${match.params.id}`)
    .then(res => setShopData(res.data))
    .catch(err => setErr(err));
  }

  const fetchStepsData = () => {
    axios.get(`/api/v1/user/steps?shop_id=${match.params.id}`)
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
    <HomeLayout subHeaderText={shopData.name} prevRef={'/'} history={props.history}>
      <div className="content">
        <div className="shop-card">
          {/* ヘッダー画像 */}
          <section className="shop-card_section">
            <div className="shop-img_wrapper">
              <img className="shop-img" src={shopData.image} alt="shop header"/>
            </div>
            <ol className="shop_base-info">
              <li className="shop_base-info_option">
                <Text theme={[TextThemes.CAPTION]}>
                  {shopData.name}
                </Text>
              </li>
              <li className="shop_base-info_option">
                <ol className="shop_cost-list">
                  <li className="shop_cost-option">
                    <span className="shop_cost-icon_day">
                      <Sun size={10} color="#fff" />
                    </span>
                    <Text theme={[TextThemes.SMALL]}>
                      {shopData.price_day}円
                    </Text>
                  </li>
                  <li className="shop_cost-option">
                    <span className="shop_cost-icon_night">
                      <Moon size={10} color="#fff" />
                    </span>
                    <Text theme={[TextThemes.SMALL]}>
                      {shopData.price_night}円
                    </Text>
                  </li>
                </ol>
              </li>
            </ol>
          </section>
          <hr className="shop_hr"/>
          {/* 感染対策情報 */}
          <section className="shop-card_section nfection-control_card">
            <h2 className="infection-control_title">感染対策</h2>
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
            <ul className="infection-control_comment">
              <li className="infection-control_comment-option">
                <Text theme={[TextThemes.SMALL]}>
                  従業員がマスクを着用しています。
                </Text>
              </li>
              <li className="infection-control_comment-option">
                <Text theme={[TextThemes.SMALL]}>
                  お客様にマスクの着用をお願いしています。
                </Text>
              </li>
            </ul>
            <hr className="infection-control_hr"/>
            <div className="infection-control_review">
              <h3 className="infection-control_review-title">対策への評価</h3>
              <ol className="infection-control_review-list">
                <li className="infection-control_review-option">
                  <Smile size={24} color="#ED753A" />
                  <span className="infection-control_review-num">
                    {shopData.good_count}<br/>
                  </span>
                </li>
                <li className="infection-control_review-option">
                  <Frown size={24} color="#3A8CED" />
                  <span className="infection-control_review-num">
                    {shopData.bad_count}<br/>
                  </span>
                </li>
              </ol>
              <Link to={`/shops/${match.params.id}/comments`}>
                <Button theme={[ButtonThemes.SUBBTN]} propStyle={propStyle.commentLink}>
                  コメントを見る
                  <ChevronRight size={14} color="#333" />
                </Button>
              </Link>
            </div>
            <hr className="infection-control_hr"/>
            <Link to={`/shops/${match.params.id}/comments/new`}>
              <Button theme={[ButtonThemes.NORMAL]} propStyle={propStyle.commentBtn}>
                <Edit size={20} color="#fff" />
                <span className="infection-control_comment-text">感染対策のレビューを書く</span>
              </Button>
            </Link>
          </section>
          <hr className="shop_hr"/>
          <section className="shop-card_section">
            <ul className="shop_info-list">
                <li className="shop_info-option">
                  <Clock size={16} color="#333" />
                  <span className="shop_info-option_content">
                    {shopData.business_date}
                  </span>
                </li>
                <li className="shop_info-option">
                  <Phone size={16} color="#333" />
                  <span className="shop_info-option_content">
                  {shopData.contact}
                  </span>
                </li>
                <li className="shop_info-option">
                  <MapPin size={16} color="#333" />
                  <span className="shop_info-option_content">
                    {shopData.address}
                  </span>
                </li>
              </ul>
            <ul className="shop_sns-list">
              <li className="shop_sns-option">
                <Link to=''>
                  <Button theme={[ButtonThemes.SHOPSNS]}>
                    <Twitter size={24} color="#333" />
                  </Button>
                </Link>
              </li>
              <li className="shop_sns-option">
                <Link to=''>
                  <Button theme={[ButtonThemes.SHOPSNS]}>
                    <Monitor size={24} color="#333" />
                  </Button>
                </Link>
              </li>
              <li className="shop_sns-option">
                <Link to=''>
                  <Button theme={[ButtonThemes.SHOPSNS]}>
                    <Instagram size={24} color="#333" />
                  </Button>
                </Link>
              </li>
              <li className="shop_sns-option">
                <Link to=''>
                  <Button theme={[ButtonThemes.SHOPSNS]}>
                    <Facebook size={24} color="#333" />
                  </Button>
                </Link>
              </li>
            </ul>
          </section>
          <hr className="shop_hr"/>
          <section className="shop-card_section">
            <Button theme={[ButtonThemes.SUBNORMAL]} propStyle={propStyle.shopedit}>
              情報の編集をリクエスト
            </Button>
          </section>
        </div>
        <style jsx>{`
          .shop-card_section{
            padding: 24px 16px;
          }
          .shop_hr{
            height: 8px;
            width: 100%;
            background: ${CommonStyle.BgGray};
            margin: 0;
          }
          // 中身
          .shop-card{
          }
          .shop-img_wrapper{
            width: 240px;
            max-width: 80%;
            height: 120px;
            overflow: hidden;
            margin: 0 auto;
            margin-bottom: 32px;
            background: ${CommonStyle.BgGray}
          }
          .shop-img{
            width: 100%;
            height: auto;
          }

          // 基本情報
          .shop_base-info{
          }
          .shop_base-info_option:not(:last-child){
            margin-bottom: 8px;
            
          }
          // コスト
          .shop_cost-list{
            display: flex;
            width: fit-content;
          }
          .shop_cost-option{
            display: flex;
            align-items: center;
            margin-right: 24px;
          }
          .shop_cost-icon_day{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 16px;
            height: 16px;
            margin-right: 8px;
            border-radius: 4px;
            background: ${CommonStyle.AccentColor};
          }
          .shop_cost-icon_night{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 16px;
            height: 16px;
            margin-right: 8px;
            border-radius: 4px;
            background: ${CommonStyle.BadColor};
          }
          .shop_cost-text{
            font-weight: bold;
            font-size: 12px;
            color: ${CommonStyle.TextBlack}
          }

          // 感染対策
          .infection-control_hr{
            height: 2px;
            margin: 0 0 16px 0;
            background: ${CommonStyle.BgGray}
          }
          .infection-control_card{
            margin-bottom: 16px;
          }
          .infection-control_title{
            margin-bottom: 16px;
          }
          .infection-control_list{
            display: flex;
            margin-bottom: 16px;
          }
          .infection-control_option:not(:last-child) {
            margin-right: 8px;
          }
          .infection-control_icon{
            width: 32px;
            height: auto;
          }
          .infection-control_comment{
            background-color: ${CommonStyle.BgGray};
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 16px;
            position: relative;
          }
          .infection-control_comment-option:not(:last-child){
            margin-bottom: 4px;
          }
          .infection-control_comment::before{
            content: '';
            position: absolute;
            left: 20px;
            //FIXME 選択中の対策内容によって吹き出しの位置が変わると○
            top: -8px;
            display: block;
            width: 0;
            height: 0;
            border-right:8px solid transparent;
            border-bottom: 12px solid ${CommonStyle.BgGray};
            border-left: 8px solid transparent;
          }
          .infection-control_review{
            margin-bottom: 16px;
          }
          .infection-control_review-title{
            font-weight: bold;
            font-size: 14px;
            line-height: 24px;
            color: ${CommonStyle.TextBlack};
            margin-bottom: 12px;
          }
          .infection-control_review-list{
            display: flex;
            float: left;
            margin-right: 24px;
          }
          .infection-control_review-option{
            display: flex;
            align-items: center;
          }
          .infection-control_review-option:not(:last-child){
            margin-right: 12px;
          }
          .infection-control_review-num{
            margin-left: 4px;
          }
          .infection-control_comment-text{
            margin-left: 8px;
          }

          

          // 基本情報
          .shop_info-list{
            margin-bottom: 16px;
          }
          .shop_info-option{
            display: flex;
            align-items: center;
            font-weight: bold;
            font-size: 12px;
            color: ${CommonStyle.TextBlack}
          }
          .shop_info-option:not(:last-child){
            margin-bottom: 16px;
          }
          .shop_info-option_content{
            margin-left: 8px;
          }
          //sns
          .shop_sns-list{
            display: flex;
            justify-content: center;
          }
          .shop_sns-option:not(:last-child){
            margin-right: 4px;
          }
        `}</style>
      </div>
    </HomeLayout>
  );
}