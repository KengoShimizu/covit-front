import React, { useState, useEffect, useContext } from 'react';
// library
import Cookies from 'universal-cookie';
import axios from "axios";
import { ChevronDown,  } from 'react-feather';
import queryString from 'query-string';
// common
import CommonStyle from './../../common/CommonStyle';
import { TopModalTime } from './../../common/Const';
// components
import IntroModal from './../molecules/Modal/IntroModal'
import HomeLayout from '../templates/HomeLayout';
import MapObject from '../organisms/MapObject';
import Button from './../atoms/Button';
import GenreCardList from '../organisms/CardList/GenreCardList';
import TopModal from '../molecules/Modal/TopModal';
import Icon, { IconThemes } from '../atoms/Icon';
import FooterActionBar from './../organisms/FooterActionBar';
// context
import TopModalContext from '../../context/TopModalContext';
// types
import Genre from '../../types/Genre';
import Loading from '../molecules/Loading';

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
    padding: '4px 20px',
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
    fontSize: '8px',
    flexDirection: 'column',
    background: CommonStyle.BgWhite,
    border: `4px solid ${CommonStyle.AccentColor}`,
    boxSizing: 'border-box',
    borderRadius: '64px',
    zIndex: 1000,
  }
};

const Top: React.FC = (props: any) => {
  const cookies = new Cookies();
  const qs = queryString.parse(props.location.search);
  const topModalContext = useContext(TopModalContext);
  const [loading, setLoading] = useState(true);
  const [firstGetCurrent, setFirstGetCurrent] = useState(0);
  const [popupIsOpen, setPopupIsOpen] = useState(false);
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
  const [genres, setGenres] = useState<Genre[]>([]);
  const [genreSerchIsOpen, setGenreSerchIsOpen] = useState(false);
  const threshold = 0.015;

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

  const fetchCoordinationsData = async (selectedGenre: number[], lat_: number, lng_: number, isSubscribed: boolean) => {
    setLoading(true);
    const selectedGenre_str = selectedGenre.length === 0 ? genres.map((data: any) => data.id) : selectedGenre.join(',')
    try {
      const res = await axios.get('/api/v1/user/coordinations', {
          params: {
            genre_ids: selectedGenre_str,
            from_lat: lat_ - threshold,
            to_lat: lat_ + threshold,
            from_lng: lng_ - threshold,
            to_lng: lng_ + threshold,
          }
        });
      if (isSubscribed) setCoordinations(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const getCullentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const pos_lat = pos.coords.latitude;
        const pos_lng = pos.coords.longitude;
        setMapCenter({ lat: pos_lat, lng: pos_lng });
        setCurLoc({ lat: pos_lat, lng: pos_lng });
        // setMapCenter({ lat: lastlat, lng: lastlng });
        // setCurLoc({ lat: lastlat, lng: lastlng });
      },
      err => console.log(err)
    );
  }

  // 初回モーダルクローズ
  const handleInitModal = () => {
    cookies.set('close-modal-once', true);
    setInitModalIsOpen(cookies.get('close-modal-once'))
  }

  useEffect(() => {
    // モーダルクローズ履歴を参照
    setInitModalIsOpen(cookies.get('close-modal-once'));
    getCullentLocation();
    let isSubscribed = true;
    fetchCoordinationsData(selectedGenre, lastlat, lastlng, isSubscribed);
    const cleanup = () => {
      isSubscribed = false;
    };
    setLoading(false);
    if(qs.state === 'login') {
      topModalContext.setContents({
        isShown: true,
        text: {
          caption: 'ログインしました！',
        }
      });
    }
    else if(qs.state === 'update_email') {
      topModalContext.setContents({
        isShown: true,
        text: {
          caption: 'メールアドレスの変更が完了しました！',
        }
      });
    }
    return cleanup;
  }, [])

  useEffect(() => {
    if (topModalContext.contents.isShown){
      setTimeout(() => {
        topModalContext.setContents({
          isShown: false,
          text: {
            caption: ''
          }
        })
      }, TopModalTime)
    }
  }, [topModalContext.contents.isShown]);

  useEffect(() => {
    setFirstGetCurrent(firstGetCurrent + 1)
    if (firstGetCurrent === 1) fetchCoordinationsData(selectedGenre, lastlat, lastlng, true)
  }, [lastlat])

  return (
    <HomeLayout>
      <TopModal/>
      <div className='container'>
        {loading && <Loading/>}
        <MapObject
          setPopupIsOpen={setPopupIsOpen}
          loading={loading}
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
        {initModalIsOpen && 
          <React.Fragment>
            <Button propStyle={propStyle.researchBtn} onClick={() => fetchCoordinationsData(selectedGenre, lastlat, lastlng, true)}>
              <Icon theme={[IconThemes.NORMAL]}>
                <img src='/reload-outline.svg' alt='reload' style={{paddingRight: '12px'}}/>
              </Icon>
              <span className="research-btn_text">
                このエリアで再検索
              </span>
            </Button>
            <Button propStyle={propStyle.currentPlaceBtn} onClick={() => {
              setMapCenter(curLoc)
              setZoom(16)
            }}>
              <span className="research-btn_icon">
                <svg id="" data-name="" xmlns="" fill="#DF6059" width="16px" viewBox="0 0 9.6 9.85"><path d="M4.21,5.77,5.74,9.7a.22.22,0,0,0,.42,0L9.58.56a.23.23,0,0,0-.29-.3L.15,3.68a.23.23,0,0,0,0,.43L4.08,5.64A.21.21,0,0,1,4.21,5.77Z"/></svg>
              </span>
              <p>
                現在地
              </p>
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
          lastlng={lastlng}
          genres={genres}
          setGenres={setGenres}/>

        {/* 初回モーダル */}
        <IntroModal initModalIsOpen={initModalIsOpen} handleInitModal={handleInitModal}/>

        {/* フッター操作バー */}
        {initModalIsOpen && !popupIsOpen && <FooterActionBar initialAccent={1}/>}
        
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
          .research-btn_text{
            margin: 4px 0 2px 0;
          }
        `}</style>
      </div>
    </HomeLayout>
  );
}

export default Top;