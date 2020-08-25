import React from 'react';
import {CommonStyle} from './../../common/CommonStyle';
import Icon, { IconThemes } from './../atoms/Icon';
import Text, { TextThemes } from './../atoms/Text';

const propStyle = {
  flexCardText: {
    marginLeft: '20px',
  }
}

interface FlexCardProps {
  src: string;
  text: string;
}

export const FlexCard: React.FC<FlexCardProps> = ({src, text}) => {
  return (
    <div className="flex-card">
      <Icon theme={[IconThemes.NORMAL]}>
        <img className="flex-card-image" src={src} alt=""/>
      </Icon>
      <Text theme={[TextThemes.SMALL]} propStyle={propStyle.flexCardText}>
        {text}
      </Text>
      <style jsx>{`
        .flex-card{
          display: flex;
          background: ${CommonStyle.BgWhite};
          height: 40px;
          padding: 10px 30px;
          box-sizing: border-box;
          align-items: center;
          text-align: center;
          margin-bottom: 8px;
        }
        .flex-card-image{
          width: 100%;
          height: auto;
        }
      `}</style>
    </div>
  );
}

