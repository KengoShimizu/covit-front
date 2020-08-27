import React from 'react';
import Icon, { IconThemes } from './../atoms/Icon';
import Text, { TextThemes } from './../atoms/Text';

const propStyle = {
  profileText: {
    marginRight: '8px'
  },
}

interface AccoutTopCardProps {
  src?: string;
  children?: React.ReactNode;
  text: string;
}

export const AccountTopCard: React.FC<AccoutTopCardProps> = ({src, text, children}) => {
  return (
    <React.Fragment>
      <Icon theme={[IconThemes.LERGE]}>
        {children && children}
        {src && <img className="account-function_img" src={src} alt=""/>}
      </Icon>
      <Text theme={[TextThemes.CAPTION]} propStyle={propStyle.profileText}> 
        {text}
      </Text>
      <style jsx>{`
        .account-function_img{
          width: 100%;
          height: auto;
        }
      `}</style>
    </React.Fragment>
  );
}

