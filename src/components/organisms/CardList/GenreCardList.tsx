import React, { useState, useEffect } from 'react';
// library
import axios from "axios";
// components
import CommonStyle from '../../../common/CommonStyle';
import GenreCard from '../../molecules/Card/GenreCard';
import Text, { TextThemes } from '../../atoms/Text';
import Button, { ButtonThemes } from '../../atoms/Button';

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
            <li className="genre-card-wrap" onClick={handleChange} id={data.name} key={`genre${i}`}>
              <GenreCard src={data.image} text={data.name} className={selectedGenre.find(data => data === i+1) ? 'selected' : ''}/>
            </li>
          ))}
        </ul>
        <div className="genre-btns">
          <Button 
            theme={[ButtonThemes.SUBNORMAL]} 
            propStyle={propStyle.btn}
            onClick={() => {
              setSelectedGenre([])
              fetchCoordinationsData([], lastlat, lastlng, true);
              setGenreSerchIsOpen(false);
            }}>
            絞り込み解除
          </Button>
          <Button
            theme={[ButtonThemes.NORMAL]} 
            propStyle={propStyle.btn}
            onClick={() => {
              fetchCoordinationsData(selectedGenre, lastlat, lastlng, true);
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
          padding: 32px 20px;
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
          max-width: 570px;
          margin: 0 auto;
          padding: 1rem 0;
        }
        .genres-container li {
          display: inline-block;
          margin: 0.3rem;
          height: 85px;
        }
        .genre-btns {
          display: flex;
          justify-content: space-evenly;
          padding: 30px 0;
          max-width: 340px;
          margin: 0 auto;
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