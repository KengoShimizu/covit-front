import React, { useState, useEffect, useContext } from 'react';
// library
import axios from "axios";
import { ChevronDown, Search } from 'react-feather';
import queryString from 'query-string';
// common
import CommonStyle from './../../common/CommonStyle';
import { TopModalTime } from './../../common/Const';
// components
import IntroModal from './../molecules/Modal/IntroModal'
import HomeLayout from '../templates/HomeLayout';
import MapObject from '../organisms/MapObject';
import Button from './../atoms/Button';
import Input, { InputThemes } from './../atoms/Input';
import GenreCardList from '../organisms/CardList/GenreCardList';
import TopModal from '../molecules/Modal/TopModal';
import Modal from '../molecules/Modal/Modal';
import Icon, { IconThemes } from '../atoms/Icon';
import FooterActionBar from './../organisms/FooterActionBar';
import StationsCardList from './../organisms/CardList/StationsCardList';
// context
import TopModalContext from '../../context/TopModalContext';
import ModalContext from '../../context/ModalContext';
// types
import Genre from '../../types/Genre';
import Station from '../../types/Station';
import Loading from '../molecules/Loading';

// ボタンのCSS
const propStyle = {
  refinement: {
    height: '28px',
    backgroundColor: CommonStyle.BgGray,
    borderRadius: '4px',
    color: CommonStyle.TextBlack,
    fontSize: '12px',
    lineHeight: '12px',
    fontWeight: 'bold',
    // display: 'flex',
    // justifyContent: 'space-evenly',
    // position: 'absolute',
    // top: '50%',
    // transform: 'translateY(-50%)',
    // WebkitTransform: 'translateY(-50%)',
  },
  refinementBtn: {
    right: '0',
    padding: '4px 16px',
  },
  refinementStation: {
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
  },
  inputStyle: {
    backgroundColor: 'white',
  }
};

const Top: React.FC = (props: any) => {
  const qs = queryString.parse(props.location.search);
  const topModalContext = useContext(TopModalContext);
  const threshold = [0.035, 0.05];
  const modalContext = useContext(ModalContext);
  const [couldFind, setCouldFind] = useState(true);
  const [loading, setLoading] = useState(true);
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
  const [searchString, setSearchString] = useState<string>('')
  const [stations, setStations] = useState<Station[]>([]);
  const [modalState, setModalState] = useState({
    title: '',
    subtitle: '',
    btntext: '',
    onClick: () => { },
    nobtn: false
  });

  const GetUniqueImgs = (steps: any) => {
    const uniqueArray = steps.map((data: any) => data.step_category.id);
    const categoryData = steps.map((data: any) => data.step_category);
    return categoryData.filter((x: any, i: number) => uniqueArray.indexOf(x.id) === i);
  }

  const handleStationClick = (data: any) => {
    fetchCoordinationsData(selectedGenre, data.y, data.x)
    setLastLat(data.y);
    setLastLng(data.x);
    setMapCenter({
      lat: data.y,
      lng: data.x 
    });
    setZoom(16);
  }

  const onSearchStations = () => {
    let formedSearchString = searchString;
    if(searchString.slice(-1) === '駅') {
      formedSearchString = formedSearchString.slice(0, -1)
    } else if (searchString.slice(-2) === 'えき') {
      formedSearchString = formedSearchString.slice(0, -2)
    }
    axios
      .get(`https://express.heartrails.com/api/json?method=getStations&name=${formedSearchString}`)
      .then(res => {
        const stationsData = res.data.response.station;
        if (stationsData) {
          let temp  = JSON.parse(JSON.stringify(stationsData));
          let result = JSON.parse(JSON.stringify(stationsData.filter((a: Station, i: number, self: Station[]) => self.findIndex((e: Station) => e.x === a.x && e.y === a.y) === i)))
          temp.filter((a: Station, i: number, self: Station[]) => {
            var flag = self.findIndex((e: Station) => e.x === a.x && e.y === a.y) === i;
            var data = self.find((e: Station) => e.x === a.x && e.y === a.y && e.line !== a.line)
            result = result.map((b: Station) => { 
              if(b.x === data?.x && b.y === data?.y){
                b.line = '';
              }
              return b
            })
            return flag
          });
          result = result.map((data: any) => {
            data.dist = Math.pow(data.x - lastlng, 2) + Math.pow(data.y - lastlat, 2);
            return data
          })
          result = result.sort(function(a: any, b: any) {
            if (a.dist < b.dist) {
                return -1;
            } else {
                return 1;
            }
          });
          console.log(result)
          setStations(result);
        } else {
          setStations([]);
        }

      })
      .catch(err => console.log(err));
  }

  const fetchStepsData = (shop: any) => {
    axios.get(`/api/v1/user/steps?shop_id=${shop.id}`)
      .then(res => {
        setSteps(res.data);
        setClickedShop(shop);
        setClickedShopUniqueStepsImages(GetUniqueImgs(res.data))
      })
      .catch(err => console.log(err));
  }

  const fetchCoordinationsData = async (selectedGenre: number[], lat_: number, lng_: number) => {
    setLoading(true);
    const selectedGenre_str = selectedGenre.length === 0 ? genres.map((data: any) => data.id) : selectedGenre.join(',')
    try {
      const res = await axios.get('/api/v1/user/coordinations', {
          params: {
            genre_ids: selectedGenre_str,
            from_lat: lat_ - threshold[0],
            to_lat: lat_ + threshold[0],
            from_lng: lng_ - threshold[1],
            to_lng: lng_ + threshold[1],
          }
        });
      if(res.data.length === 0) setCouldFind(false)
      setCoordinations(res.data);
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
        setLastLat(pos_lat)
        setLastLng(pos_lng)
        setMapCenter({ lat: pos_lat, lng: pos_lng });
        setCurLoc({ lat: pos_lat, lng: pos_lng });
        fetchCoordinationsData(selectedGenre, pos_lat, pos_lng)
        // setMapCenter({ lat: lastlat, lng: lastlng });
        // setCurLoc({ lat: lastlat, lng: lastlng });
      },
      err => console.log(err)
    );
  }

  const onKeyPressEnter = (event: any) => {
    if(event.key === 'Enter'){
      onSearchStations()
    }
  }

  // 初回モーダルクローズ
  const handleInitModal = () => {
    localStorage.setItem('close-modal-once', 'true')
    setInitModalIsOpen(true)
  }

  useEffect(() => {
    // モーダルクローズ履歴を参照
    if(!localStorage.getItem('close-modal-once')) setInitModalIsOpen(false);
    let isSubscribed = true;
    if(isSubscribed){
      getCullentLocation();
    }
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
    if(!couldFind){
      setModalState({
        title: 'このエリアにはまだ\nお店が登録されていません。',
        subtitle: '感染対策をしているお店をご存知ですか？\n是非リクエスト機能でお店を登録して下さい！',
        btntext: '',
        onClick: () => {},
        nobtn: true
      })
      setCouldFind(true)
      modalContext.toggleModalShown(true);
    }
  }, [couldFind])

  return (
    <HomeLayout>
      <TopModal/>
      <Modal
        title={modalState.title}
        subtitle={modalState.subtitle}
        btntext={modalState.btntext}
        onClick={modalState.onClick}
        nobtn={modalState.nobtn}/>
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
          setZoom={setZoom}
          stations={stations}
          fetchCoordinationsData={fetchCoordinationsData}
          selectedGenre={selectedGenre}
          handleStationClick={handleStationClick}
        />

        <div className="refinement-btn-wrap">
          <div className="station-search" onKeyPress={onKeyPressEnter}>
            <Input
              theme={InputThemes.INIT}
              placeholder="駅名を入力してください"
              content={searchString}
              handleChange={(e: any) => setSearchString(e.target.value)}
              propStyle={{...propStyle.refinement, ...propStyle.refinementStation}}
              noLabel={true}
              icon={<Search onClick={onSearchStations} style={{ cursor: 'pointer' }} />}
            />
          </div>
          <div className="genre-search">
            <Button propStyle={{...propStyle.refinement, ...propStyle.refinementBtn}} onClick={() => setGenreSerchIsOpen(true)}>
              絞り込み<ChevronDown size={24} color="#333" />
            </Button>
          </div>
        </div>

        {stations && 
        <StationsCardList
          stations={stations}
          handleStationClick={handleStationClick}
        />}

        {initModalIsOpen && 
          <React.Fragment>
            <Button propStyle={propStyle.researchBtn} onClick={() => fetchCoordinationsData(selectedGenre, lastlat, lastlng)}>
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
        {initModalIsOpen && !popupIsOpen && stations.length === 0 && <FooterActionBar initialAccent={1}/>}
        
        <style jsx>{`
          .container{
            width: 100%;
          }
          .refinement-btn-wrap{
            width: 100%;
            display: flex;
            background-color: ${CommonStyle.BgWhite};
            position: fixed;
            top: 0;
            height: 40px;
            text-align: center;
            z-index: 400;
          }
          .station-search{
            position: relative;
            width: 70%;
          }
          .genre-search{
            position: relative;
            width: 30%;
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