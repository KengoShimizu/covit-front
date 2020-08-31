import React, { useState, useEffect } from 'react';
// library
import Cookies from 'universal-cookie';
import axios from "axios";
import { ChevronDown } from 'react-feather';
// common
import CommonStyle from './../../common/CommonStyle';
// components
import IntroModal from './../molecules/Modal/IntroModal'
import HomeLayout from '../templates/HomeLayout';
import MapObject from '../organisms/MapObject';
import Button, { ButtonThemes } from './../atoms/Button';
import GenreCardList from '../organisms/CardList/GenreCardList';
import TopModal from '../molecules/Modal/TopModal';
import Icon, { IconThemes } from '../atoms/Icon';
import FooterActionBar from './../organisms/FooterActionBar';

// ボタンのCSS
const propStyle = {
  refinementBtn: {
    padding: '4px 16px',
    height: '28px',
    backgroundColor: CommonStyle.BgGray,
    borderRadius: '4px',
    color: CommonStyle.TextBlack,
    fontSize: '12px',
    lineHeight: '12px',
    fontWeight: 'bold',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    WebkitTransform: 'translate(-50%, -50%)',
  },
  researchBtn: {
    position: 'fixed',
    top: '54px',
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
    top: '54px',
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
      <TopModal/>
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

        <div className="refinement-btn-wrap">
          <Button propStyle={propStyle.refinementBtn} onClick={() => setGenreSerchIsOpen(true)}>
            お店のジャンルで絞り込む<ChevronDown size={24} color="#333" />
          </Button>
        </div>
        {
          initModalIsOpen && 
            <React.Fragment>
              <Button propStyle={propStyle.researchBtn} onClick={() => fetchCoordinationsData(genre_id, lastlat, lastlng)}>
                <Icon theme={[IconThemes.NORMAL]}><img src='/reload-outline.svg' alt='reload' style={{paddingRight: '13px'}}/></Icon>
                このエリアで再検索
              </Button>
              <Button propStyle={propStyle.currentPlaceBtn} onClick={() => {
                setMapCenter(curLoc)
                setZoom(16)
              }}>
                現在地
              </Button>
            </React.Fragment>
        }
  
        <GenreCardList 
          selectedGenre={selectedGenre} 
          setSelectedGenre={setSelectedGenre}
          genreSerchIsOpen={genreSerchIsOpen}
          setGenreSerchIsOpen={setGenreSerchIsOpen}
          fetchCoordinationsData={fetchCoordinationsData}
          lastlat={lastlat} 
          lastlng={lastlng}/>

        {/* 初回モーダル */}
        <IntroModal initModalIsOpen={initModalIsOpen} handleInitModal={handleInitModal}/>

        {/* フッター操作バー */}
        {initModalIsOpen && <FooterActionBar/>}
        
        <style jsx>{`
          .container{
            width: 100%;
          }
          .refinement-btn-wrap{
            width: 100%;
            background-color: ${CommonStyle.BgWhite};
            position: fixed;
            top: 0;
            height: 40px;
            text-align: center;
            z-index: 400;
          }
        `}</style>
      </div>
    </HomeLayout>
  );
}