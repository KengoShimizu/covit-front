import React, { useEffect } from 'react';
// library
import axios from "axios";
// components
import CommonStyle from '../../../common/CommonStyle';
import GenreCard from '../../molecules/Card/GenreCard';
import Text, { TextThemes } from '../../atoms/Text';
import Button, { ButtonThemes } from '../../atoms/Button';
import InlineNend from './../../common/InlineNend';

const propStyle = {
  title: {
    marginBottom: '32px'
  },
  btn: {
    width: '140px'
  }
}

interface GenreCardListProps {
  selectedGenre: number[];
  setSelectedGenre: any;
  genreSerchIsOpen: boolean;
  setGenreSerchIsOpen: any;
  fetchCoordinationsData: any;
  lastlat: number;
  lastlng: number;
  genres: any;
  setGenres: any
}

const GenreCardList: React.FC<GenreCardListProps> = ({selectedGenre, setSelectedGenre, genreSerchIsOpen, setGenreSerchIsOpen, fetchCoordinationsData, lastlat, lastlng, genres, setGenres}) => {

  const fetchGenres = async (isSubscribed: boolean) => {
    try {
      const res = await axios.get('/api/v1/user/genres');
      if (isSubscribed) setGenres(res.data.data);
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (event: any) => {
    const selectedId = genres.findIndex((data: any) => data.name === event.currentTarget.id) + 1;
    // 既に選択されていたら除去
    if(selectedGenre.find(data => data === selectedId)){
      setSelectedGenre(selectedGenre.filter(data => data !== selectedId));
    }
    // 追加
    else{
      setSelectedGenre([
        ...selectedGenre, 
        selectedId
      ]);
    }
  }
  
  useEffect(() => {
    let isSubscribed = true;
    fetchGenres(isSubscribed);
    const cleanup = () => {
      isSubscribed = false;
    };
    return cleanup;
  }, []);

  return (
    <React.Fragment>
      <div className={genreSerchIsOpen ? "genre-search-blur" : "disable"} onClick={() => setGenreSerchIsOpen(false)}></div>
      <div className={genreSerchIsOpen ? 'container' : 'container close'}>
        <Text theme={[TextThemes.CAPTION]} propStyle={propStyle.title}>ジャンルで絞り込む</Text>
        <ul className="genres-container">
          {genres.map((data: any, i: number) => (
            <li 
              className={selectedGenre.find(data => data === i+1) ? 'selected genre-card' : 'genre-card'}
              onClick={handleChange}
              id={data.name}
              key={`genre${i}`}>
              <GenreCard 
                src={data.icon}
                text={data.name}
              />
            </li>
          ))}
        </ul>
        <InlineNend media={65737} site={342425} spot={1014055} type={1} oriented={1} id={'GenreSearch'} height={70} width={320}/>
        <div className="genre-btns">
          <Button 
            theme={[ButtonThemes.SUBNORMAL]} 
            propStyle={propStyle.btn}
            onClick={() => {
              setSelectedGenre([])
              fetchCoordinationsData([], lastlat, lastlng);
              setGenreSerchIsOpen(false);
            }}>
            絞り込み解除
          </Button>
          <Button
            theme={[ButtonThemes.NORMAL]} 
            propStyle={propStyle.btn}
            onClick={() => {
              fetchCoordinationsData(selectedGenre, lastlat, lastlng);
              setGenreSerchIsOpen(false);
            }}>
            絞り込み
          </Button>
        </div>
      </div>
      <style jsx>{`
        .container {
          position: fixed;
          top: 0;
          left: 50%;
          width: 100%;
          padding: 16px 20px;
          margin: 0 auto;
          transform: translateX(-50%);
          -webkit- transform: translateX(-50%);
          background-color: ${CommonStyle.BgWhite};
          text-align: center;
          z-index: 1500;
          transition-duration: .5s;
        }
        .close {
          top: -200vh;
        }
        .genres-container {
          width: fit-content;
          margin: 0 auto 8px auto;
          display: grid;
          grid-template-columns: repeat(4, 72px);
          grid-auto-rows: 72px;
          column-gap: 16px;
          row-gap: 16px;
          transition-duration: 1s;
          transition-timing-function: ease;
        }
        @media screen and (min-width: 720px) {
          .genres-container {
            grid-template-columns: repeat(6, 72px);
          }
        }
        .genre-card {
          display: inline-block;
          background: ${CommonStyle.BgWhite};
          border: 2px solid ${CommonStyle.BorderGray};
          border-radius: 4px;
          text-align: center;
          z-index: 1000;
          height: 72px;
          width: 72px;
          box-sizing: border-box;
          padding: 6px 0;
        }
        .genre-card.selected {
          border: 2px solid ${CommonStyle.AccentColor};
        } 
        .genre-btns {
          display: flex;
          justify-content: space-evenly;
          max-width: 340px;
          margin: 0 auto 24px auto;
        }
        .blur-range{
          height: 500px;
        }
        .disable{
          visibility: hidden;
          opacity: 0;
        }
        .genre-search-blur{
          position: fixed;
          top: 0;
          height: 100%;
          width: 100%;
          visibility: visible;
          transition-duration: .5s;
          z-index: 1000;
          background-color: rgba(0,0,0,.15);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
      `}</style>
    </React.Fragment>
  );
}

export default GenreCardList;