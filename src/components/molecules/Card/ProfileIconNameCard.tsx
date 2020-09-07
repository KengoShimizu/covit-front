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

interface AccoutTopCardProps {
  src: string;
  name: string;
}

const AccountTopCard: React.FC<AccoutTopCardProps> = ({src, name}) => {
  return (
    <div className="account-info_card">
      {/* FIXME IconThemes.COVIDMEASURE*/}
      <Icon theme={[IconThemes.PROFILE]} propStyle={propStyle.accountIcon}>
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
          padding: 24px 0 24px 16px;
          position: fixed;
          z-index: 100;
          background: ${CommonStyle.BgWhite}
        }
        .account-info_profile-icon{
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}

export default AccountTopCard;