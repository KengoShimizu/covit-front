import React from 'react';
// library
import { Link } from 'react-router-dom';
// components
import Icon, { IconThemes } from './../../atoms/Icon';
import Text, { TextThemes } from './../../atoms/Text';

const propStyle = {
  profileText: {
    marginRight: '8px'
  },
}

interface AccoutTopCardProps {
  src?: string;
  icon?: React.ReactNode;
  text: string;
  nextRef?: string;
}

const AccountTopCard: React.FC<AccoutTopCardProps> = ({src, text, icon, nextRef='#'}) => {
  return (
    <a href={nextRef}>
      <li className="account-function_option">
        <Icon theme={[IconThemes.LERGE]}>
          {icon && icon}
          {src && <img className="account-function_img" src={src} alt=""/>}
        </Icon>
        <Text theme={[TextThemes.CAPTION]} propStyle={propStyle.profileText}> 
          {text}
        </Text>
      </li>
      <style jsx>{`
        .account-function_option{
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        }
        .account-function_img{
          width: 100%;
          height: auto;
        }
      `}</style>
    </a>
  );
}

export default AccountTopCard;