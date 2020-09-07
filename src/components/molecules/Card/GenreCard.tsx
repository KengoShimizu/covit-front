import React from 'react';
// common
import CommonStyle from '../../../common/CommonStyle';
// components
import Icon, { IconThemes } from '../../atoms/Icon';
import Text, { TextThemes } from '../../atoms/Text';

const propStyle = {
  genreCardIcon: {
    margin: '0 auto 4px auto',
  }
}

interface GenreCardProps {
  src: string;
  text: string;
  // className: string;
}

const GenreCard: React.FC<GenreCardProps> = ({src, text}) => {
  return (
    <div>
      <Icon theme={[IconThemes.LERGE]} propStyle={propStyle.genreCardIcon}>
        <img className="genre-card-image" src={src} alt=""/>
      </Icon>
      <Text theme={[TextThemes.SMALL]} >
        {text}
      </Text>
      <style jsx>{`
        .genre-card-image {
          width: 100%;
          height: auto;
        }
      `}</style>
    </div>
  );
}

export default GenreCard;