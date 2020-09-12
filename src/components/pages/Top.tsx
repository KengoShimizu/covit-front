import React, { useState, useEffect, useContext } from 'react';
// library
import axios from "axios";
import { Search, X } from 'react-feather';
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
    height: '32px',
    borderRadius: '4px',
    backgroundColor: CommonStyle.BgGray,
  },
  refinementBtn: {
    height: '32px',
    padding: '8px 12px',
    borderRadius: '18px',
    boxSizing: 'border-box',
    backgroundColor: CommonStyle.AccentColor,
  },
  researchBtn: {
    position: 'fixed',
    top: '68px',
    left: '50%',
    transform: 'translateX(-50%)',
    WebkitTransform: 'translateX(-50%)',
    height: '36px',
    width: '176px',
    padding: '8px 20px',
    background: CommonStyle.BgWhite,
    border: `1.5px solid ${CommonStyle.BorderGray}`,
    boxSizing: 'border-box',
    borderRadius: '36px',
    color: CommonStyle.TextBlack,
    fontSize: '12px',
    lineHeight: '1em',
    fontWeight: 'bold',
    zIndex: 1000,
  },
  reloadIcon: {
    marginRight: '4px',
  },
  currentPlaceBtn: {
    position: 'fixed',
    top: '50%',
    transform: 'translateY(-50%)',
    // -webkit- transform: 'translateY(-50%)',
    right: '-4px',
    width: '64px',
    height: '64px',
    paddingLeft: '8px',
    fontSize: '8px',
    fontWeight: 'bold',
    flexDirection: 'column',
    background: CommonStyle.BgWhite,
    border: `4px solid ${CommonStyle.AccentColor}`,
    boxSizing: 'border-box',
    borderRadius: '40px 0px 0px 40px',
    boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.15)',
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
  const [zoom, setZoom] = useState(14);
  const [coordinations, setCoordinations] = useState([]);
  const [steps, setSteps] = useState([]);
  const [clickedShop, setClickedShop] = useState({});
  const [clickedShopGenre, setClickedShopGenre] = useState({});
  const [mapCenter, setMapCenter] = useState({ lat: lastlat, lng: lastlng });
  const [curLoc, setCurLoc] = useState({ lat: lastlat, lng: lastlng }); // これは現在地でしか使わない
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
    setZoom(14);
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
          setStations(result);
        } else {
          setModalState({
            title: '駅名が見つかりませんでした。',
            subtitle: '正しい駅名を入力してください。',
            btntext: '',
            onClick: () => {},
            nobtn: true
          })
          modalContext.toggleModalShown(true);
          setStations([]);
        }

      })
      .catch(err => console.log(err));
  }

  const setMapPopupInfo = (coordination: any) => {
    setSteps(coordination.shop.steps);
    setClickedShop(coordination.shop);
    setClickedShopUniqueStepsImages(GetUniqueImgs(coordination.shop.steps));
    setClickedShopGenre(coordination.genre);
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

  const backFromShopPage = async (coord_id: number) => {
    try{
      const res = await axios.get(`/api/v1/user/coordinations/${coord_id}`);
      const lat = Number(res.data.latitude);
      const lng = Number(res.data.longitude);
      setMapCenter({ lat: lat, lng: lng });
      fetchCoordinationsData(selectedGenre, lat, lng);
    } catch (error) {
      console.log(error)
    }
  }

  const getCullentLocation = (coord_id?: number) => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const pos_lat = pos.coords.latitude;
        const pos_lng = pos.coords.longitude;
        setCurLoc({ lat: pos_lat, lng: pos_lng });
        if (coord_id) {
          backFromShopPage(coord_id);
        } else {
          setMapCenter({ lat: pos_lat, lng: pos_lng });
          fetchCoordinationsData(selectedGenre, pos_lat, pos_lng);
        }
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
      if(typeof qs.coord === "string") getCullentLocation(parseInt(qs.coord));
      else getCullentLocation();
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
          clickedShopGenre={clickedShopGenre}
          curLoc={curLoc}
          clickedShop={clickedShop}
          mapCenter={mapCenter}
          clickedShopUniqueStepsImages={clickedShopUniqueStepsImages}
          setMapCenter={setMapCenter}
          setMapPopupInfo={(coordination: any) => setMapPopupInfo(coordination)}
          setLastLat={setLastLat}
          setLastLng={setLastLng}
          setZoom={setZoom}
          stations={stations}
          fetchCoordinationsData={fetchCoordinationsData}
          selectedGenre={selectedGenre}
          handleStationClick={handleStationClick}
        />

        <div className="search-header">
          <div className="station-search" onKeyPress={onKeyPressEnter}>
            <Input
              theme={[InputThemes.INIT]}
              IconTheme={InputThemes.ICON_LEFT}
              placeholder="駅名で検索"
              content={searchString}
              handleChange={(e: any) => setSearchString(e.target.value)}
              propStyle={propStyle.refinement}
              icon={<Search onClick={onSearchStations} size="16px" color="#8C8C8C" />}
            />
            {searchString.length !== 0 && 
              <X size={24} 
                color={CommonStyle.BorderGray} 
                style={{position: 'absolute',
                  top: '4px',
                  right: '4px',
                }}
                onClick={() => {
                  setSearchString('');
                  setStations([]);
                }}
              />
            }
          </div>
          <Button propStyle={{...propStyle.refinement, ...propStyle.refinementBtn}} onClick={() => setGenreSerchIsOpen(true)}>
            <img className="genre-search_icon" src="narrow-down.svg" alt="ジャンルで絞り込む"/>
            <p className="genre-search_text">
              絞り込み
            </p>
          </Button>
        </div>

        {stations && 
        <StationsCardList
          stations={stations}
          handleStationClick={handleStationClick}
        />}

        {initModalIsOpen && 
          <React.Fragment>
            <Button propStyle={propStyle.researchBtn} onClick={() => fetchCoordinationsData(selectedGenre, lastlat, lastlng)}>
              <Icon theme={[IconThemes.LITTLE]} propStyle={propStyle.reloadIcon}>
                <img src='/reload-outline.svg' alt='reload'/>
              </Icon>
              <span className="research-btn_text">
                このエリアで再検索
              </span>
            </Button>
            <Button propStyle={propStyle.currentPlaceBtn} onClick={() => {
              setMapCenter(curLoc)
              setZoom(14)
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
          .search-header{
            width: 100%;
            height: 56px;
            box-sizing: border-box;
            padding: 12px;
            display: flex;
            position: fixed;
            top: 0;
            text-align: center;
            background-color: ${CommonStyle.BgWhite};
            z-index: 400;
          }
          .station-search{
            position: relative;
            margin-right: 8px;
            width: calc(100% - 98px);
            max-width: 20em;
          }
          .genre-search{
            position: relative;
            width: 30%;
          }
          .research-btn_text{
            margin: 4px 0 2px 0;
          }
          .genre-search_icon{
            margin-right: 4px;
          }
          .genre-search_text{
            color: white;
            font-weight: bold;
            font-size: 12px;
            line-height: 1em;
          }
        `}</style>
      </div>
    </HomeLayout>
  );
}

export default Top;