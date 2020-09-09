import React from 'react';
// library
import { ChevronRight } from 'react-feather';
import { Link } from 'react-router-dom';
// components
import Icon, { IconThemes } from './../atoms/Icon';
import Text, { TextThemes } from './../atoms/Text';

const propStyle = {
  nextRefBtnText: {
    lineHeight: '1.8em',
  },
}

interface NextRefBtnProps {
  nextRef: string;
  text: string;
  style?: any;
  styleText?: any;
}

const NextRefBtn: React.FC<NextRefBtnProps> = ({nextRef, text, style, styleText}) => {
  return (
    <Link to={nextRef}>
      <div className="next-ref-btn" style={{...style, ...styleText}}>
        <Text theme={[TextThemes.CAPTION]} propStyle={propStyle.nextRefBtnText}>{text}</Text>
        <Icon theme={[IconThemes.NORMAL]}>
          <ChevronRight size={24} color="#333" />
        </Icon>
      </div>
      <style jsx>{`
        .next-ref-btn{
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </Link>
  );
}

export default NextRefBtn;

