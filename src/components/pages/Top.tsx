import React, { useState, useEffect } from 'react';
// library
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from "axios";
import { ChevronDown } from 'react-feather';
// common
import CommonStyle from './../../common/CommonStyle';
// image
import ServiceIcon from './../../img/service-icon.svg';
import Charactor from './../../img/charactor.png';
// components
import HomeLayout from '../templates/HomeLayout';
import MapObject from '../organisms/MapObject';
import Button, { ButtonThemes } from './../atoms/Button';
import GenreCardList from '../organisms/CardList/GenreCardList';
import ModalTop from './../molecules/Modal/ModalTop';

// ボタンのCSS
const propStyle = {
  shopMordal: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 auto 40px auto'
  },
  refinementBtn: {
    position: 'fixed',
    top: '64px',
    left: '50%',
    transform: 'translateX(-50%)',
    WebkitTransform: 'translateX(-50%)',
    padding: '8px 16px',
    background: CommonStyle.BgWhite,
    borderRadius: '4px',
    color: CommonStyle.TextBlack,
    fontSize: '12px',
    lineHeight: '12px',
    fontWeight: 'bold',
    zIndex: 1000,
  },
  researchBtn: {
    position: 'fixed',
    bottom: '32px',
    left: '50%',
    transform: 'translateX(-50%)',
    WebkitTransform: 'translateX(-50%)',
    height: '36px',
    padding: '8px 20px',
    background: CommonStyle.BgWhite,
    border: `1.5px solid ${CommonStyle.BorderGray}`,
    boxSizing: 'border-box',
    borderRadius: '36px',
    color: CommonStyle.TextBlack,
    fontSize: '12px',
    lineHeight: '19px',
    fontWeight: 'bold',
    zIndex: 1000,
  },
  currentPlaceBtn: {
    position: 'fixed',
    bottom: '20px',
    right: '24px',
    width: '64px',
    height: '64px',
    background: CommonStyle.BgWhite,
    border: `4px solid ${CommonStyle.AccentColor}`,
    boxSizing: 'border-box',
    borderRadius: '64px',
    zIndex: 1000,
  }
};

export const Top: React.FC = (props: any) => {
  const cookies = new Cookies();
  const [initModalIsOpen, setInitModalIsOpen] = useState(true);
  const [lastlat, setLastLat] = useState(35.6513297);
  const [lastlng, setLastLng] = useState(139.5832906);
  const [zoom, setZoom] = useState(16);
  const [coordinations, setCoordinations] = useState([]);
  const [steps, setSteps] = useState([]);
  const [clickedShop, setClickedShop] = useState({});
  const [mapCenter, setMapCenter] = useState({ lat: lastlat, lng: lastlng });
  const [curLoc, setCurLoc] = useState({ lat: lastlat, lng: lastlng });
  const [clickedShopUniqueStepsImages, setClickedShopUniqueStepsImages] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [genreSerchIsOpen, setGenreSerchIsOpen] = useState(false);
  const threshold = 0.015;
  const genre_id = Array.from(new Array(12)).map((v,i)=> i + 1);

  const GetUniqueImgs = (steps: any) => {
    const images = steps.map((data: any) => data.image);
    const uniqueImgs = images.filter(function (x: string, i: number, self: string[]) {
      return self.indexOf(x) === i;
    });
    return uniqueImgs;
  }

  const fetchStepsData = (shop: any) => {
    // FIXME
    axios.get(`/api/v1/user/steps?shop_id=${1}`)
      .then(res => {
        setSteps(res.data);
        setClickedShop(shop);
        setClickedShopUniqueStepsImages(GetUniqueImgs(res.data))
      })
      .catch(err => console.log(err));
  }

  const fetchCoordinationsData = (genre_id: number[], lat_: number, lng_: number) => {
    const genre_id_str = genre_id.length === 0 ? Array.from(new Array(12)).map((v,i)=> i + 1) : genre_id.join(',')
    axios.get('/api/v1/user/coordinations', {
        params: {
          genre_ids: genre_id_str,
          from_lat: lat_ - threshold,
          to_lat: lat_ + threshold,
          from_lng: lng_ - threshold,
          to_lng: lng_ + threshold,
        }
      })
      .then(res => setCoordinations(res.data))
      .catch(err => console.log(err));
  }

  const getCullentLocation = () => {
    ///* FIXME 現在地座標取得（デバッグのためコメントアウト）
    navigator.geolocation.getCurrentPosition(
      pos => {
        //const pos_lat = pos.coords.latitude;
        //const pos_lng = pos.coords.longitude;
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
    setInitModalIsOpen(cookies.get('close-modal-once'));
    getCullentLocation();
    fetchCoordinationsData(genre_id, lastlat, lastlng);
  }, [])


  return (
    <HomeLayout>
      <ModalTop/>
      <div className='container'>
        <MapObject
          coordinations={coordinations}
          steps={steps}
          zoom={zoom}
          curLoc={curLoc}
          clickedShop={clickedShop}
          mapCenter={mapCenter}
          clickedShopUniqueStepsImages={clickedShopUniqueStepsImages}
          setMapCenter={setMapCenter}
          fetchStepsData={(shop: any) => fetchStepsData(shop)}
          setLastLat={setLastLat}
          setLastLng={setLastLng}
          setZoom={setZoom}/>

        <Button propStyle={propStyle.refinementBtn} onClick={() => setGenreSerchIsOpen(true)}>
          お店のジャンルで絞り込む<ChevronDown size={24} color="#333" />
        </Button>
        <Button propStyle={propStyle.researchBtn} onClick={() => fetchCoordinationsData(genre_id, lastlat, lastlng)}>
          このエリアで再検索
        </Button>
        <Button propStyle={propStyle.currentPlaceBtn} onClick={() => setMapCenter(curLoc)}>
          現在地
        </Button>
  
        <GenreCardList 
          selectedGenre={selectedGenre} 
          setSelectedGenre={setSelectedGenre}
          genreSerchIsOpen={genreSerchIsOpen}
          setGenreSerchIsOpen={setGenreSerchIsOpen}
          fetchCoordinationsData={fetchCoordinationsData}
          lastlat={lastlat} 
          lastlng={lastlng}/>

        {/* 初回モーダル */}
        {!initModalIsOpen && <div className='intro-mordal-back' onClick={handleInitModal}></div>}
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
          .container{
            width: 100%;
          }
          // 初回のモーダル
          .intro-mordal-back{
            height: 100%;
            width: 100%;
            z-index: 999;
            position: absolute;
            top: 0;
          }
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
        `}</style>
      </div>
    </HomeLayout>
  );
}