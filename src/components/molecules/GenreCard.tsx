import React from 'react';
import {CommonStyle} from './../../common/CommonStyle';
import Icon, { IconThemes } from './../atoms/Icon';
import Text, { TextThemes } from './../atoms/Text';

const propStyle = {
  genreCardIcon: {
    margin: 'auto',
  }
}

interface FlexCardProps {
  src: string;
  text: string;
}

export const GenreCard: React.FC<FlexCardProps> = ({src, text}) => {
  return (
    <div className="genre-card">
      <div className="genre-card-inner">
        <Icon theme={[IconThemes.LERGE]} propStyle={propStyle.genreCardIcon}>
          <img className="genre-card-image" src={src} alt=""/>
        </Icon>
        <Text theme={[TextThemes.CAPTION]} >
          {text}
        </Text>
      </div>
      <style jsx>{`
        .genre-card{
          border: 2px solid gray;
          border-radius: 5px;
          text-align: center;
          z-index: 1000;
          background: ${CommonStyle.BgWhite};
          height: 72px;
          width: 72px;
          margin: 16px 0px;
        }
        .genre-card-inner{
          padding: 5px;
        }
        .genre-card-image{
          width: 100%;
          height: auto;
        }
      `}</style>
    </div>
  );
}

