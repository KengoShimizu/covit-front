import React from 'react';
// components
import CommonStyle from '../../../common/CommonStyle';
import GenreCard from '../../molecules/Card/GenreCard';
import Text, { TextThemes } from '../../atoms/Text';
import Button, { ButtonThemes } from '../../atoms/Button';

// FIXME
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

const GenreCardList: React.FC<GenreCardListProps> = ({selectedGenre, setSelectedGenre, genreSerchIsOpen, setGenreSerchIsOpen, fetchCoordinationsData, lastlat, lastlng}) => {

  const handleChange = (event: any) => {
    const selectedId = genres.findIndex(data => data === event.currentTarget.id) + 1;
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

  return (
    <React.Fragment>
      <div className={genreSerchIsOpen ? "genre-search-blur" : "disable"} onClick={() => setGenreSerchIsOpen(false)}></div>
      <div className={genreSerchIsOpen ? 'container' : 'container close'}>
        <Text theme={[TextThemes.CAPTION]} propStyle={propStyle.title}>ジャンルで絞り込む</Text>
        <ul className="genres-container">
          {Array.from(Array(12).keys(), x => x+1).map(num => <li className="genre-card-wrap" onClick={handleChange} id={genres[num-1]} key={`genre${num}`}><GenreCard src={`genre-icon${num}`} text={genres[num-1]} className={selectedGenre.find(data => data === num) ? 'selected' : ''}/></li>)}
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
      <style jsx>{`
        .container {
          position: fixed;
          top: 0;
          left: 50%;
          width: 100%;
          margin: 0 auto;
          margin-top: 50px;
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
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
        }
      `}</style>
    </React.Fragment>
  );
}

export default GenreCardList;