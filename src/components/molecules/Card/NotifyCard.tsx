import React from 'react';
// common
import CommonStyle from './../../../common/CommonStyle';
// components
import Text, { TextThemes } from './../../atoms/Text';

interface NotifyCardProps {
  line_1: string;
  line_2: string;
}

const NotifyCard: React.FC<NotifyCardProps> = ({line_1, line_2}) => {
  return (
    <div className='notify-card-wrap'>
      <div className='notify-card'>
        <Text theme={[TextThemes.CAPTION]} propStyle={{color: CommonStyle.TextWhite}}>{line_1}</Text>
        <Text theme={[TextThemes.CAPTION]} propStyle={{color: CommonStyle.TextWhite}}>{line_2}</Text>
      </div>
      <style jsx>{`
        .notify-card-wrap{
          background-color: ${CommonStyle.AccentColor};
          width: 80%;
          text-align: center;
          margin: 0 auto;
          border-radius: 4px;
          margin-top: -20px;
        }
        .notify-card{
          padding: 14px;
        }
      `}</style>
    </div>
  );
}

export default NotifyCard;