import React from 'react';
import {CommonStyle} from './../../common/CommonStyle';
import Icon, { IconThemes } from './../atoms/Icon';
import Text, { TextThemes } from './../atoms/Text';

const propStyle = {
  genreCardText: {
    //marginLeft: '20px',
  }
}

interface FlexCardProps {
  src: string;
  text: string;
}

export const GenreCard: React.FC<FlexCardProps> = ({src, text}) => {
  return (
    <div className="genre-card">
      <Icon theme={[IconThemes.NORMAL]}>
        <img className="genre-card-image" src={src} alt=""/>
      </Icon>
      <Text theme={[TextThemes.SMALL]} propStyle={propStyle.genreCardText}>
        {text}
      </Text>
      <style jsx>{`
        .genre-card{
          z-index: 1000;
          position: fixed;
          top: 100px;
          left: 100px;
          background: ${CommonStyle.BgWhite};
          height: 72px;
          width: 72px;
          flex: none;
          order: 1;
          align-self: center;
          margin: 16px 0px;
        }
        .genre-card-image{
          width: 100%;
          height: auto;
        }
      `}</style>
    </div>
  );
}

