import React from 'react';
// components
import Icon, { IconThemes } from './../../atoms/Icon';
import Text, { TextThemes } from './../../atoms/Text';
import CommonStyle from '../../../common/CommonStyle';

const propStyle = {
  accountIcon: {
    marginRight: '16px'
  }
};

interface ProfileIconNameCardProps {
  src: string;
  name: string;
  style?: any;
  styleImg?: any;
}

const ProfileIconNameCard: React.FC<ProfileIconNameCardProps> = ({src, name, style, styleImg}) => {
  return (
    <div className="account-info_card" style={style}>
      <Icon theme={[IconThemes.PROFILE]} propStyle={{...propStyle.accountIcon, ...styleImg}}>
        <img className="account-info_profile-icon" src={src} alt=""/>
      </Icon>
      <Text theme={[TextThemes.CAPTION]}> 
        {name}
      </Text>
      <style jsx>{`
        .account-info_card{
          display: flex;
          align-items: center;
          width: 100%;
          box-sizing: border-box;
          margin-bottom: 16px;
          background: ${CommonStyle.BgWhite};
        }
        .account-info_profile-icon{
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}

export default ProfileIconNameCard;