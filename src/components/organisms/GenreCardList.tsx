import React from 'react';
import { CommonStyle } from '../../common/CommonStyle';
import { GenreCard } from './../molecules/GenreCard';
import Text, { TextThemes } from './../atoms/Text';
import Button, { ButtonThemes } from './../atoms/Button';

const genres = ['カフェ', 'ラーメン', '和食', '洋食', '中華', 'イタリアン', 'カレー', '焼肉', '寿司', '居酒屋', 'バー', 'その他'];

const propStyle = {
  title: {
    paddingTop: '25px'
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
}

export const GenreCardList: React.FC<GenreCardListProps> = ({selectedGenre, setSelectedGenre, genreSerchIsOpen, setGenreSerchIsOpen, fetchCoordinationsData, lastlat, lastlng}) => {

  const handleChange = (event: any) => {
    const selectedId = genres.findIndex(data => data === event.currentTarget.id) + 1;
    // 既に選択されていたら除去
    if(selectedGenre.find(data => data == selectedId)){
      setSelectedGenre(selectedGenre.filter(data => data != selectedId));
    }
    // 追加
    else{
      setSelectedGenre([
        ...selectedGenre, 
        selectedId
      ]);
    }
  }

  return (
    <div className={genreSerchIsOpen ? 'container-blur' : 'container-blur close'}>
      <div className='container'>
        <Text theme={[TextThemes.CAPTION]} propStyle={propStyle.title}>ジャンルで絞り込む</Text>
        <ul className="genres-container">
          {Array.from(Array(12).keys(), x => x+1).map(num => <li className="genre-card-wrap" onClick={handleChange} id={genres[num-1]} key={`genre${num}`}><GenreCard src={`genre-icon${num}`} text={genres[num-1]} className={selectedGenre.find(data => data == num) ? 'selected' : ''}/></li>)}
        </ul>
        <div className="genre-btns">
          <Button 
            theme={[ButtonThemes.SUBNORMAL]} 
            propStyle={propStyle.btn}
            onClick={() => setSelectedGenre([])}>
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
      <div className="blur-range" onClick={() => setGenreSerchIsOpen(false)}></div>
      <style jsx>{`
        .container-blur{
          height: 100vh;
          position: fixed;
          top: 0;
          left: 50%;
          z-index: 1000;
          transform: translateX(-50%);
          -webkit- transform: translateX(-50%);
          transition-duration: .5s;
          width: 100%;
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
        }
        .container {
          width: 100%;
          margin: 0 auto;
          margin-top: 50px;
          background-color: ${CommonStyle.BgWhite};
          text-align: center;
        }
        .close {
          top: -200vh;
        }
        .genres-container {
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
        }
        .blur-range{
          height: 500px;
        }
      `}</style>

    </div>
  );
}