import React from 'react';
import Icon, { IconThemes } from '../atoms/Icon'
import { CommonStyle } from '../../common/CommonStyle';
import { GenreCard } from './../molecules/GenreCard';

interface GenreCardListProps {
  selectedGenre: number[];
  setSelectedGenre: any;
}


export const GenreCardList: React.FC<GenreCardListProps> = ({selectedGenre, setSelectedGenre}) => {
  const genres = ['カフェ', 'ラーメン', '和食', '洋食', '中華', 'イタリアン', 'カレー', '焼肉', '寿司', '居酒屋', 'バー', 'その他'];

  const handleChange = (event: any) => {
    setSelectedGenre(selectedGenre.push(event.targe.id));
  }

  return (
    <div className="container">
      <ul className="genres-container">
        {Array.from(Array(12).keys(), x => x+1).map(num => <li className="genre-card-wrap"><GenreCard src={`genre-icon${num}`} text={genres[num-1]}/></li>)}
      </ul>
      <style jsx>{`
        .container {
          margin-top: 50px;
          background-color: ${CommonStyle.BgWhite};
          text-align: center;
          position: fixed;
          top: 64px;
          left: 50%;
          z-index: 1000;
          transform: translateX(-50%);
          -webkit- transform: translateX(-50%);
        }
        .genres-container {
          padding: 1rem 2rem;
          max-width: 350px;
          margin: 0 auto;
        }
        .genre-card-wrap{
          float: left;
        }
        .icons-container li {
          display: inline-block;
          margin: 0.5rem;
        }

      `}</style>

    </div>
  );
}