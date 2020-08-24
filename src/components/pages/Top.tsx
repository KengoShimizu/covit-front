import React, { useState, useEffect } from 'react';
import {CommonStyle} from './../../common/CommonStyle';
import { Link } from 'react-router-dom';
import ServiceIcon from './../../img/service-icon.svg';
import Charactor from './../../img/charactor.png';
import { HomeLayout } from '../templates/HomeLayout';
import { MapObject } from '../organisms/MapObject';
import Cookies from 'universal-cookie';
import Button, { ButtonThemes } from './../atoms/Button';
import axios from "axios";

// ボタンのCSS
const propStyle = {
  shopMordal: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 auto 40px auto'
  }
};

export const Top: React.FC = () => {
  const cookies = new Cookies();
  const [initModalIsOpen, setInitModalIsOpen] = useState(true);
  const [lastlat, setLastLat] = useState(35.6513297);
  const [lastlng, setLastLng] = useState(139.5832906);
  const [genre_id, setGenres] = useState([]);
  const [err, setErr] = useState("");
  const [coordinations, setCoordinations] = useState([]);
  const [steps, setSteps] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [clickedShop, setClickedShop] = useState({});
  const [mapCenter, setMapCenter] = useState({ lat: 35.6513297, lng: 139.5832906 });
  const [curLoc, setCurLoc] = useState({ lat: 35.6513297, lng: 139.5832906 });
  const [clickedShopUniqueStepsImages, setClickedShopUniqueStepsImages] = useState([]);

  const GetUniqueImgs = (steps: any) => {
    const images = steps.map((data: any) => data.image);
    const uniqueImgs = images.filter(function (x: string, i: number, self: string[]) {
      return self.indexOf(x) === i;
    });
    return uniqueImgs;
  }

  const fetchStepsData = (shop: any) => {
    axios.get(`/api/v1/user/steps?shop_id=1`)
      .then(res => {
        setSteps(res.data);
        setIsOpen(true);
        setClickedShop(shop);
        setClickedShopUniqueStepsImages(GetUniqueImgs(res.data))
      })
      .catch(err => setErr(err));
  }

  const fetchCoordinationsData = (genre_id: number[], lat_: number, lng_: number) => {
    axios.get('/api/v1/user/coordinations', {
        params: {
          genre_id: [],
          from_lat: lat_ - 0.025,
          to_lat: lat_ + 0.025,
          from_lng: lng_ - 0.025,
          to_lng: lat_ + 0.025,
        }
      })
      .then(res => {console.log(res.data);setCoordinations(res.data)})
      .catch(err => setErr(err));
  }

  const getCullentLocation = () => {
    ///* FIXME 現在地座標取得（デバッグのためコメントアウト）
    navigator.geolocation.getCurrentPosition(
      pos => {
        const pos_lat = pos.coords.latitude;
        const pos_lng = pos.coords.longitude;
        //setMapCenter({ lat: pos_lat, lng: pos_lng });
        //setCurLoc({ lat: pos_lat, lng: pos_lng });
        setMapCenter({ lat: lastlat, lng: lastlng });
        setCurLoc({ lat: lastlat, lng: lastlng });
      },
      err => console.log(err)
    );
    //*/
  }

  // 初回モーダルクローズ
  const handleInitModal = () => {
    cookies.set('close-modal-once', true);
    setInitModalIsOpen(cookies.get('close-modal-once'))
  }

  // モーダルクローズ履歴を参照
  useEffect(() => {
    setInitModalIsOpen(cookies.get('close-modal-once'))
    getCullentLocation()
    fetchCoordinationsData(genre_id, lastlat, lastlng);
  }, [])

  return (
    <HomeLayout>
      <div className='container'>
        <MapObject 
          coordinations={coordinations}
          steps={steps}
          isOpen={isOpen}
          curLoc={curLoc}
          clickedShop={clickedShop}
          mapCenter={mapCenter}
          clickedShopUniqueStepsImages={clickedShopUniqueStepsImages}
          setMapCenter={setMapCenter}
          fetchStepsData={(shop: any) => fetchStepsData(shop)}
          setLastLat={setLastLat}
          setLastLng={setLastLng}/>
        <button className="refinement-btn">お店のジャンルで絞り込む</button>
        <button className="research-btn" onClick={() => fetchCoordinationsData(genre_id, lastlat, lastlng)}>このエリアで再検索</button>
        <button className="current-place-btn" onClick={() => setMapCenter(curLoc)}>現在地</button>
        {/* 初回モーダル */}
        <div className={initModalIsOpen ? 'intro-mordal disable' : 'intro-mordal'}>
          <h1 className="intro-mordal_title">PAND-MEAL<br/> <span className="intro-mordal_title_jp">へようこそ！</span></h1>
          <img className="intro-mordal_img" src={Charactor} alt=""/>
          <p className="intro-mordal_text">
            PAND-MEALは感染対策に取り組む飲食店と感染対策を求めている人のためのグルメサービスです！
          </p>
          {/* propstyle */}
          <div onClick={handleInitModal}>
            <Button theme={[ButtonThemes.NORMAL]} propStyle={propStyle.shopMordal}>
              <img className="intro-mordal_btn_icon" src={ServiceIcon} alt=""/>
              さっそく飲食店を探す
            </Button>
          </div>
          <Link to=''>
            <p className="intro-mordal_link">PAND-MEALについてもっと知りたい！</p>
          </Link>
          <Link to=''>
            <p className="intro-mordal_link">PAND-MEALにお店を追加したい！</p>
          </Link>
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
            width: 100%;
          }
          // 初回のモーダル
          .intro-mordal{
            visibility: visible;
            top: 144px;
            left: 50%;
            z-index: 1000;
            transform: translateX(-50%);
            -webkit- transform: translateX(-50%);
            position: fixed;
            background: ${CommonStyle.BgWhite};
            border-radius: 8px;
            max-width: 280px;
            width: 80%;
            padding: 36px 16px;
            box-sizing: border-box;
            text-align: center;
            transition-duration: .5s;
          }
          .intro-mordal_title{
            font-family: Century Gothic Pro;
            font-weight: bold;
            font-size: 24px;
            line-height: 24px;
            margin-bottom: 4px;
          }
          .intro-mordal_title_jp{
            font-weight: bold;
            font-size: 18px;
            line-height: 24px;
          }
          .intro-mordal_title_img{
            width: 186px;
            height: auto;
            margin-bottom: 8px;
          }
          .intro-mordal_text{
            font-weight: bold;
            width: 100%;
            font-size: 14px;
            line-height: 24px;
            margin-bottom: 24px;
          }
          .intro-mordal_link{
            color: ${CommonStyle.TextDarkGary};
            text-align: center;
            font-size: 12px;
            line-height: 19px;
          }
          .intro-mordal_btn_icon{
            margin-right: 4px;
          }
          .disable{
            visibility: hidden;
            opacity: 0;
          }
          // 中身
          .map-container{
            margin-top: 56px;
            width: 100%;
            height: calc(100vh - 56px);
            background-color: #E8E6E2;
          }
          .refinement-btn{
            position: fixed;
            top: 64px;
            left: 50%;
            transform: translateX(-50%);
            -webkit- transform: translateX(-50%);
            padding: 8px 16px;
            background: ${CommonStyle.BgWhite};
            border-radius: 4px;
            color: ${CommonStyle.TextBlack};
            font-size: 12px;
            line-height: 12px;
            font-weight: bold;
          }
          .research-btn{
            position: fixed;
            bottom: 32px;
            left: 50%;
            transform: translateX(-50%);
            -webkit- transform: translateX(-50%);
            height: 36px;
            padding: 8px 20px;
            background: ${CommonStyle.BgWhite};
            border: 1.5px solid ${CommonStyle.BorderGray};
            box-sizing: border-box;
            border-radius: 36px;
            color: ${CommonStyle.TextBlack};
            font-size: 12px;
            line-height: 19px;
            font-weight: bold;
          }
          .current-place-btn{
            position: fixed;
            bottom: 20px;
            right: 24px;
            width: 64px;
            height: 64px;
            background: ${CommonStyle.BgWhite};
            border: 4px solid ${CommonStyle.AccentColor};
            box-sizing: border-box;
            border-radius: 64px;
          }
          .refinement-btn{
            position: fixed;
            top: 64px;
            left: 50%;
            transform: translateX(-50%);
            -webkit- transform: translateX(-50%);
            padding: 8px 16px;
            background: ${CommonStyle.BgWhite};
            border-radius: 4px;
            color: ${CommonStyle.TextBlack};
            font-size: 12px;
            line-height: 12px;
            font-weight: bold;
            z-index: 1000;
          }
          .research-btn{
            position: fixed;
            bottom: 32px;
            left: 50%;
            transform: translateX(-50%);
            -webkit- transform: translateX(-50%);
            height: 36px;
            padding: 8px 20px;
            background: ${CommonStyle.BgWhite};
            border: 1.5px solid ${CommonStyle.BorderGray};
            box-sizing: border-box;
            border-radius: 36px;
            color: ${CommonStyle.TextBlack};
            font-size: 12px;
            line-height: 19px;
            font-weight: bold;
            z-index: 1000;
          }
          .current-place-btn{
            position: fixed;
            bottom: 20px;
            right: 24px;
            width: 64px;
            height: 64px;
            background: ${CommonStyle.BgWhite};
            border: 4px solid ${CommonStyle.AccentColor};
            box-sizing: border-box;
            border-radius: 64px;
            z-index: 1000;
          }
        `}</style>
      </div>
    </HomeLayout>
  );
}